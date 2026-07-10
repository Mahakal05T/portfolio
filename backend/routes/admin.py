from flask import Blueprint, request, jsonify, current_app
from database import db
from models.contact import ContactMessage

bp = Blueprint('admin', __name__)

def require_admin(f):
    """Simple decorator to check admin API key."""
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        expected_key = current_app.config.get('ADMIN_API_KEY')
        
        if not auth_header or auth_header != f"Bearer {expected_key}":
            return jsonify({"error": "Unauthorized"}), 401
            
        return f(*args, **kwargs)
    return decorated_function

@bp.route('/messages', methods=['GET'])
@require_admin
def get_messages():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    status_filter = request.args.get('status')
    search = request.args.get('search')
    sort = request.args.get('sort', 'desc')

    query = ContactMessage.query

    # Apply filters
    if status_filter:
        query = query.filter(ContactMessage.status == status_filter)
        
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (ContactMessage.name.ilike(search_term)) | 
            (ContactMessage.email.ilike(search_term)) |
            (ContactMessage.subject.ilike(search_term))
        )

    # Apply sorting
    if sort == 'asc':
        query = query.order_by(ContactMessage.created_at.asc())
    else:
        query = query.order_by(ContactMessage.created_at.desc())

    # Apply pagination
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "messages": [msg.to_dict() for msg in paginated.items],
        "total": paginated.total,
        "pages": paginated.pages,
        "current_page": paginated.page
    }), 200

@bp.route('/messages/<int:id>', methods=['GET'])
@require_admin
def get_message(id):
    msg = ContactMessage.query.get_or_404(id)
    return jsonify(msg.to_dict()), 200

@bp.route('/messages/<int:id>', methods=['PATCH'])
@require_admin
def update_message(id):
    msg = ContactMessage.query.get_or_404(id)
    data = request.get_json()
    
    if 'status' in data:
        new_status = data['status']
        if new_status in ['Unread', 'Read', 'Archived']:
            msg.status = new_status
            
    try:
        db.session.commit()
        return jsonify(msg.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update"}), 500

@bp.route('/messages/<int:id>', methods=['DELETE'])
@require_admin
def delete_message(id):
    msg = ContactMessage.query.get_or_404(id)
    try:
        db.session.delete(msg)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete"}), 500
