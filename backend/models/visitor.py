from database import db
from datetime import datetime, timezone

class WebsiteVisitor(db.Model):
    __tablename__ = 'website_visitors'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    visitor_id = db.Column(db.Text, unique=True, nullable=False, index=True)
    first_visit = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'visitor_id': self.visitor_id,
            'first_visit': self.first_visit.isoformat() if self.first_visit else None
        }
