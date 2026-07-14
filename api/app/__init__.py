from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173,http://localhost:3000,http://localhost:8080').split(',')
    CORS(app, origins=cors_origins)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = os.getenv('SESSION_COOKIE_SAMESITE', 'Lax')
    app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE', 'False').lower() == 'true'
    app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', os.path.join(app.instance_path, 'uploads'))
    
    # Database configuration
    database_url = os.getenv('DATABASE_URL', 'sqlite:///bynolo.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    from .models import db
    db.init_app(app)
    migrate = Migrate(app, db)
    
    # Register blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    from .admin_routes import admin_bp, admin_api_bp
    app.register_blueprint(admin_bp)
    app.register_blueprint(admin_api_bp)

    @app.route('/uploads/screenshots/<path:filename>')
    def uploaded_screenshot(filename):
        screenshot_path = os.path.join(app.config['UPLOAD_FOLDER'], 'screenshots')
        return send_from_directory(screenshot_path, filename)

    register_cli(app)
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({'status': 'healthy', 'service': 'bynolo-api'}), 200
    
    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            'message': 'byNolo API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/health',
                'api': '/api/*'
            }
        })
    
    return app


def register_cli(app):
    @app.cli.command('refresh-screenshots')
    def refresh_screenshots():
        """Capture screenshots for all featured external projects and hub items."""
        from .models import db, Project, HubItem
        from .admin_routes import choose_url, set_screenshot_result
        from .services import capture_screenshot, is_safe_url

        with app.app_context():
            count = 0
            for model in (Project, HubItem):
                for record in model.query.filter(model.featured == True).all():
                    url = choose_url(record)
                    if not is_safe_url(url, allow_relative=False):
                        continue
                    result = capture_screenshot(app, url, record.slug or record.title)
                    set_screenshot_result(record, result)
                    count += 1
                    print(f"{record.title}: {result['status']}")
            db.session.commit()
            print(f"Refreshed {count} screenshots")

    @app.cli.command('check-links')
    def check_links():
        """Check health for all featured external projects and hub items."""
        from .models import db, Project, HubItem
        from .admin_routes import choose_url, set_health_result
        from .services import check_url_health, is_safe_url

        with app.app_context():
            count = 0
            for model in (Project, HubItem):
                for record in model.query.filter(model.featured == True).all():
                    url = choose_url(record)
                    if not is_safe_url(url, allow_relative=False):
                        continue
                    result = check_url_health(url)
                    set_health_result(record, result)
                    count += 1
                    print(f"{record.title}: {result['status']}")
            db.session.commit()
            print(f"Checked {count} links")

    @app.cli.command('seed-v2-content')
    def seed_v2_content():
        """Backfill V2 categories and settings when upgrading an existing database."""
        from .models import db, Category, SiteSetting

        categories = [
            ('service', 'Services', 'Infrastructure, APIs, and shared systems', 1),
            ('app', 'Apps', 'Full product experiences and tools', 2),
            ('site', 'Sites', 'Websites, portfolios, and public surfaces', 3),
            ('tool', 'Tools', 'Utilities, automations, and experiments', 4),
        ]
        settings = [
            ('brand_name', 'byNolo', 'text', 'Public brand name'),
            ('admin_notes', 'Use /admin to manage portfolio content and screenshots.', 'text', 'Internal admin note'),
        ]

        with app.app_context():
            created = 0
            for slug, name, description, order_index in categories:
                category = Category.query.filter_by(slug=slug).first()
                if not category:
                    category = Category(slug=slug)
                    db.session.add(category)
                    created += 1
                category.name = name
                category.description = description
                category.color = 'from-green-400 to-green-600'
                category.order_index = order_index
                category.featured = True

            for key, value, value_type, description in settings:
                setting = SiteSetting.query.filter_by(key=key).first()
                if not setting:
                    setting = SiteSetting(key=key)
                    db.session.add(setting)
                    created += 1
                setting.value = value
                setting.value_type = value_type
                setting.description = description

            db.session.commit()
            print(f"Seeded V2 content defaults ({created} new rows)")
