from flask import request

def get_client_ip():
    """Extract client IP address safely from request headers or remote addr."""
    if request.headers.getlist("X-Forwarded-For"):
        return request.headers.getlist("X-Forwarded-For")[0]
    return request.remote_addr

def get_user_agent():
    """Extract user agent from request."""
    return request.headers.get('User-Agent', '')
