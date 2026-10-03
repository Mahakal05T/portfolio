from flask import Blueprint, request, jsonify
import requests

from app import limiter
from database import db
from models.contact import ContactMessage
from utils.validators import validate_contact_form, sanitize_html
from utils.helpers import get_client_ip, get_user_agent
from services.email_service import send_notification_email, send_auto_reply

bp = Blueprint('contact', __name__)

@bp.route('', methods=['POST'])
@limiter.limit("5 per minute")  # Basic rate limiting
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
    db.session.add(new_contact)
    db.session.commit()

    # Send contact data to n8n
    try:
        response = requests.post(
            "https://hsuya.app.n8n.cloud/webhook/portfolio-contact",
            json={
                "name": name,
                "email": email,
                "subject": subject,
                "message": message
            },
            timeout=5
        )

        print("n8n response:", response.status_code, response.text)

    except requests.RequestException as e:
        print(f"n8n webhook error: {e}")

    # Existing email notifications
    send_notification_email(new_contact)
    send_auto_reply(new_contact)