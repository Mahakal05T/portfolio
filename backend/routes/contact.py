import threading
from flask import Blueprint, request, jsonify, current_app
import requests

from app import limiter
from database import db
from models.contact import ContactMessage
from utils.validators import validate_contact_form, sanitize_html
from utils.helpers import get_client_ip, get_user_agent
from services.email_service import send_notification_email, send_auto_reply

bp = Blueprint('contact', __name__)

class ContactSnapshot:
    """Thread-safe snapshot of contact data for async processing."""
    def __init__(self, name, email, subject, message, ip_address, user_agent, created_at):
        self.name = name
        self.email = email
        self.subject = subject
        self.message = message
        self.ip_address = ip_address
        self.user_agent = user_agent
        self.created_at = created_at

def _async_notify(app, snapshot):
    """Background task to send n8n webhook and emails without blocking HTTP response."""
    with app.app_context():
        # 1. Send to n8n webhook
        try:
            response = requests.post(
                "https://hsuya.app.n8n.cloud/webhook/portfolio-contact",
                json={
                    "name": snapshot.name,
                    "email": snapshot.email,
                    "subject": snapshot.subject,
                    "message": snapshot.message
                },
                timeout=15
            )
            print("n8n response:", response.status_code, response.text)
        except requests.RequestException as e:
            print(f"n8n webhook error: {e}")

        # 2. Send emails via Resend
        try:
            send_notification_email(snapshot)
            send_auto_reply(snapshot)
        except Exception as e:
            print(f"Email service error: {e}")

@bp.route('', methods=['POST'])
@limiter.limit("15 per minute")
def submit_contact():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Validate data
    errors = validate_contact_form(data)
    if errors:
        return jsonify({"errors": errors}), 400

    # Sanitize inputs
    name = sanitize_html(data.get('name'))
    email = sanitize_html(data.get('email'))
    subject = sanitize_html(data.get('subject'))
    message = sanitize_html(data.get('message'))

    # Get client info
    ip_address = get_client_ip()
    user_agent = get_user_agent()

    # Create new contact message
    new_contact = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message,
        ip_address=ip_address,
        user_agent=user_agent
    )

    # Save to database
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error saving contact message: {e}")
        return jsonify({"error": "Failed to save message"}), 500

    # Snapshot data for background execution
    snapshot = ContactSnapshot(
        name=new_contact.name,
        email=new_contact.email,
        subject=new_contact.subject,
        message=new_contact.message,
        ip_address=new_contact.ip_address,
        user_agent=new_contact.user_agent,
        created_at=new_contact.created_at
    )

    # Trigger webhook & emails in background thread (non-blocking)
    app = current_app._get_current_object()
    thread = threading.Thread(target=_async_notify, args=(app, snapshot), daemon=True)
    thread.start()

    return jsonify({
        "message": "Message sent successfully",
        "data": {
            "id": new_contact.id
        }
    }), 201