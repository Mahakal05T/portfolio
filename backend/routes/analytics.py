from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from app import limiter
from database import db
from models.visitor import WebsiteVisitor

bp = Blueprint('analytics', __name__)

@bp.route('/visitor', methods=['POST'])
@limiter.limit("30 per minute")
def register_visitor():
    data = request.get_json()
    if not data or not isinstance(data, dict):
        return jsonify({"error": "Invalid payload format"}), 400

    visitor_id = data.get('visitor_id')
    if not visitor_id or not isinstance(visitor_id, str):
        return jsonify({"error": "visitor_id is required and must be a string"}), 400

    visitor_id = visitor_id.strip()
    if len(visitor_id) == 0 or len(visitor_id) > 128:
        return jsonify({"error": "visitor_id length must be between 1 and 128 characters"}), 400

    # Check if visitor already exists
    existing = WebsiteVisitor.query.filter_by(visitor_id=visitor_id).first()
    if not existing:
        try:
            new_visitor = WebsiteVisitor(visitor_id=visitor_id)
            db.session.add(new_visitor)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            # Visitor was inserted concurrently by another request
        except Exception as e:
            db.session.rollback()
            print(f"Error registering visitor: {e}")
            return jsonify({"error": "Failed to process visitor registration"}), 500

    total_count = WebsiteVisitor.query.count()
    return jsonify({"count": total_count}), 200

@bp.route('/visitors/count', methods=['GET'])
@limiter.limit("60 per minute")
def get_visitor_count():
    try:
        total_count = WebsiteVisitor.query.count()
        return jsonify({"count": total_count}), 200
    except Exception as e:
        print(f"Error fetching visitor count: {e}")
        return jsonify({"error": "Failed to fetch visitor count"}), 500
