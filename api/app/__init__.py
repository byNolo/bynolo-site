from flask import Flask, jsonify, request
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
