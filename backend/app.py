from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import Config
from database import db

# Initialize extensions
cors = CORS()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with app
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    limiter.init_app(app)

    # Register blueprints
    from routes.contact import bp as contact_bp
    from routes.admin import bp as admin_bp
    
    app.register_blueprint(contact_bp, url_prefix='/api/contact')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Ensure tables are created
    with app.app_context():
        db.create_all()

    return app
