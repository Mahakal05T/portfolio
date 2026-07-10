import re
import html

def is_valid_email(email):
    """Validate email format using regex."""
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(pattern, email) is not None

def sanitize_html(text):
    """Basic HTML sanitization to prevent script injection."""
    if not text:
        return text
    # Convert HTML tags into safe entities
    safe_text = html.escape(text.strip())
    return safe_text

def validate_contact_form(data):
    """Validate contact form inputs based on requirements."""
    errors = {}

    name = data.get('name', '')
    if not name or len(name) < 3 or len(name) > 80:
        errors['name'] = 'Name must be between 3 and 80 characters.'

    email = data.get('email', '')
    if not email or not is_valid_email(email):
        errors['email'] = 'Valid email is required.'

    subject = data.get('subject', '')
    if not subject or len(subject) > 120:
        errors['subject'] = 'Subject is required and max 120 characters.'

    message = data.get('message', '')
    if not message or len(message.strip()) < 20 or len(message) > 1000:
        errors['message'] = 'Message must be between 20 and 1000 characters.'

    return errors
