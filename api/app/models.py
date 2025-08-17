from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Project(db.Model):
    """Project model for portfolio projects"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack_json = db.Column(db.Text, nullable=False)  # JSON string of technologies
    github_url = db.Column(db.String(500))
    live_url = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='Active')  # Active, Planning, Archived
    order_index = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    icon = db.Column(db.String(500))  # Emoji or URL
    icon_type = db.Column(db.String(20), default='emoji')  # emoji or image
    icon_label = db.Column(db.String(200))
    
    def get_tech_stack(self):
        """Get tech stack as a list"""
        try:
            return json.loads(self.tech_stack_json) if self.tech_stack_json else []
        except (json.JSONDecodeError, TypeError):
            return []
    
    def set_tech_stack(self, value):
        """Set tech stack from a list"""
        self.tech_stack_json = json.dumps(value) if value else '[]'
    
    def to_dict(self):
        """Convert project to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'tech_stack': self.get_tech_stack(),
            'github_url': self.github_url,
            'live_url': self.live_url,
            'featured': self.featured,
            'status': self.status,
            'icon': self.icon,
            'iconType': self.icon_type,
            'iconLabel': self.icon_label,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Project {self.title}>'


class HubItem(db.Model):
    """Hub item model for service/app directory"""
    __tablename__ = 'hub_items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(500), nullable=False)  # Emoji or URL
    icon_type = db.Column(db.String(20), default='emoji')  # emoji or image
    icon_label = db.Column(db.String(200))
    link = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(50), default='Active')  # Live, Beta, Active, Development, Planning
    categories_json = db.Column(db.Text, nullable=False)  # JSON array of categories
    color = db.Column(db.String(100))  # Tailwind gradient classes
    order_index = db.Column(db.Integer, default=0)
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def get_categories(self):
        """Get categories as a list"""
        try:
            return json.loads(self.categories_json) if self.categories_json else []
        except (json.JSONDecodeError, TypeError):
            return []
    
    def set_categories(self, value):
        """Set categories from a list"""
        self.categories_json = json.dumps(value) if value else '[]'
    
    def to_dict(self):
        """Convert hub item to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'icon': self.icon,
            'iconType': self.icon_type,
            'iconLabel': self.icon_label,
            'link': self.link,
            'status': self.status,
            'categories': self.get_categories(),
            'color': self.color,
            'featured': self.featured,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<HubItem {self.title}>'


class ContactSubmission(db.Model):
    """Contact form submission model"""
    __tablename__ = 'contact_submissions'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(300))
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='new')  # new, read, responded
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    read_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert contact submission to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'read_at': self.read_at.isoformat() if self.read_at else None
        }
    
    def __repr__(self):
        return f'<ContactSubmission from {self.email}>'


class SiteStats(db.Model):
    """Site statistics model"""
    __tablename__ = 'site_stats'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(200))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert stat to dictionary"""
        return {
            'key': self.key,
            'value': self.value,
            'description': self.description,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<SiteStats {self.key}: {self.value}>'
