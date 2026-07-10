import os
import resend
from flask import current_app

def send_notification_email(contact):
    """Send email notification to admin about new contact."""
    api_key = current_app.config.get('RESEND_API_KEY')
    if not api_key:
        print("Warning: Resend API key not configured. Email not sent.")
        return False
        
    resend.api_key = api_key
    
    sender_email = current_app.config.get('SENDER_EMAIL', 'onboarding@resend.dev')
    admin_email = current_app.config.get('CONTACT_EMAIL')
    
    if not admin_email:
        print("Warning: CONTACT_EMAIL not configured. Notification not sent.")
        return False

    html_content = f"""
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> {contact.name}</p>
    <p><strong>Email:</strong> {contact.email}</p>
    <p><strong>Subject:</strong> {contact.subject}</p>
    <p><strong>Message:</strong></p>
    <p>{contact.message}</p>
    <hr>
    <p><small>IP: {contact.ip_address}</small></p>
    <p><small>Browser: {contact.user_agent}</small></p>
    <p><small>Date: {contact.created_at}</small></p>
    """

    try:
        r = resend.Emails.send({
            "from": sender_email,
            "to": [admin_email],
            "subject": "📩 New Portfolio Contact",
            "html": html_content
        })
        return True
    except Exception as e:
        print(f"Failed to send notification email: {e}")
        return False

def send_auto_reply(contact):
    """Send auto-reply to the user."""
    api_key = current_app.config.get('RESEND_API_KEY')
    if not api_key:
        return False
        
    resend.api_key = api_key
    sender_email = current_app.config.get('SENDER_EMAIL', 'onboarding@resend.dev')

    html_content = f"""
    <p>Hello {contact.name},</p>
    <p>Thank you for reaching out.</p>
    <p>I have received your message successfully.</p>
    <p>I usually reply within 24 to 48 hours.</p>
    <br>
    <p>Best Regards,</p>
    <p>Ayush Singh</p>
    """

    try:
        r = resend.Emails.send({
            "from": sender_email,
            "to": [contact.email],
            "subject": "Thank you for contacting me",
            "html": html_content
        })
        return True
    except Exception as e:
        print(f"Failed to send auto reply email: {e}")
        return False
