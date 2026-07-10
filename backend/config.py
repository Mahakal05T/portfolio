import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-dev-key')
    
    # SQLAlchemy configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
    
    # Fix for Render postgres URLs and use pg8000 driver
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql+pg8000://", 1)
    elif SQLALCHEMY_DATABASE_URI.startswith("postgresql://") and not SQLALCHEMY_DATABASE_URI.startswith("postgresql+pg8000://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgresql://", "postgresql+pg8000://", 1)
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Resend API settings
    RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
    CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL')
    SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
    
    # Admin settings
    ADMIN_API_KEY = os.environ.get('ADMIN_API_KEY', 'default-admin-key')
    
    # Rate limiting
    RATELIMIT_DEFAULT = "200 per day; 50 per hour"
