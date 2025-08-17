from flask import Blueprint, jsonify, request
from .models import db, Project, ContactSubmission, SiteStats, HubItem
from datetime import datetime
import re

# Create API blueprint
api_bp = Blueprint('api', __name__)

def validate_email(email):
    """Simple email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects for the portfolio"""
    try:
        projects = Project.query.order_by(Project.order_index.asc(), Project.created_at.desc()).all()
        projects_data = [project.to_dict() for project in projects]
        return jsonify({'projects': projects_data, 'count': len(projects_data)})
    except Exception as e:
        return jsonify({'error': 'Failed to fetch projects'}), 500

@api_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific project by ID"""
    try:
        project = Project.query.get_or_404(project_id)
        return jsonify(project.to_dict())
    except Exception as e:
        return jsonify({'error': 'Project not found'}), 404

@api_bp.route('/hub', methods=['GET'])
def get_hub_items():
    """Get all hub items"""
    try:
        # Get category filter if provided
        category_filter = request.args.get('category')
        status_filter = request.args.get('status')
        
        query = HubItem.query
        
        if category_filter:
            # Filter by category (requires JSON search)
            query = query.filter(HubItem.categories_json.like(f'%"{category_filter}"%'))
        
        if status_filter:
            query = query.filter(HubItem.status == status_filter)
        
        hub_items = query.order_by(HubItem.order_index.asc(), HubItem.created_at.desc()).all()
        items_data = [item.to_dict() for item in hub_items]
        
        return jsonify({
            'items': items_data, 
            'count': len(items_data),
            'filters': {
                'category': category_filter,
                'status': status_filter
            }
        })
    except Exception as e:
        return jsonify({'error': 'Failed to fetch hub items'}), 500

@api_bp.route('/hub/<int:item_id>', methods=['GET'])
def get_hub_item(item_id):
    """Get a specific hub item by ID"""
    try:
        item = HubItem.query.get_or_404(item_id)
        return jsonify(item.to_dict())
    except Exception as e:
        return jsonify({'error': 'Hub item not found'}), 404

@api_bp.route('/hub/categories', methods=['GET'])
def get_hub_categories():
    """Get all available hub categories with counts"""
    try:
        # Get all hub items to extract categories
        hub_items = HubItem.query.all()
        category_counts = {}
        
        for item in hub_items:
            categories = item.get_categories()
            for category in categories:
                category_counts[category] = category_counts.get(category, 0) + 1
        
        # Define category metadata
        category_info = {
            'service': {
                'id': 'service',
                'name': 'Services',
                'description': 'Core infrastructure and APIs',
                'color': 'from-blue-500 to-blue-600'
            },
            'app': {
                'id': 'app', 
                'name': 'Applications',
                'description': 'Full-featured web applications',
                'color': 'from-purple-500 to-purple-600'
            },
            'site': {
                'id': 'site',
                'name': 'Websites',
                'description': 'Marketing and portfolio sites',
                'color': 'from-green-500 to-green-600'
            },
            'tool': {
                'id': 'tool',
                'name': 'Tools',
                'description': 'Development and utility tools',
                'color': 'from-yellow-500 to-yellow-600'
            }
        }
        
        # Combine counts with metadata
        categories = {}
        for cat_id, info in category_info.items():
            categories[cat_id] = {
                **info,
                'count': category_counts.get(cat_id, 0)
            }
        
        return jsonify({'categories': categories})
    except Exception as e:
        return jsonify({'error': 'Failed to fetch categories'}), 500

@api_bp.route('/contact', methods=['POST'])
def contact_form():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        if not all(field in data and data[field].strip() for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Create new contact submission
        submission = ContactSubmission(
            name=data['name'].strip(),
            email=data['email'].strip(),
            subject=data.get('subject', '').strip(),
            message=data['message'].strip()
        )
        
        db.session.add(submission)
        db.session.commit()
        
        return jsonify({
            'message': 'Contact form submitted successfully',
            'status': 'received',
            'id': submission.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit contact form'}), 500

@api_bp.route('/stats', methods=['GET'])
def get_stats():
    """Get site statistics"""
    try:
        # Get stats from database
        stats_from_db = SiteStats.query.all()
        stats_dict = {stat.key: stat.value for stat in stats_from_db}
        
        # Add dynamic stats
        total_projects = Project.query.count()
        stats_dict['total_projects'] = str(total_projects)
        
        # Convert numeric values back to numbers for response
        response_stats = {}
        for key, value in stats_dict.items():
            try:
                # Try to convert to int first, then float
                if '.' in value:
                    response_stats[key] = float(value)
                else:
                    response_stats[key] = int(value)
            except (ValueError, TypeError):
                # Keep as string if conversion fails
                response_stats[key] = value
        
        # Add last updated timestamp
        response_stats['last_updated'] = datetime.utcnow().strftime('%Y-%m-%d')
        
        return jsonify(response_stats)
    except Exception as e:
        return jsonify({'error': 'Failed to fetch statistics'}), 500
