import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "default-dev-key"
    )

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")

    if not SQLALCHEMY_DATABASE_URI:
        raise RuntimeError("DATABASE_URL environment variable is not set")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
    CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL")
    SENDER_EMAIL = os.environ.get(
        "SENDER_EMAIL",
        "onboarding@resend.dev"
    )

    ADMIN_API_KEY = os.environ.get(
        "ADMIN_API_KEY",
        "default-admin-key"
    )

    RATELIMIT_DEFAULT = "200 per day; 50 per hour"