#!/usr/bin/env python3
"""
byNolo Site API Server
Development entry point for Flask application
"""

from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    # Development server configuration
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting byNolo API server...")
    print(f"🌐 Server running at: http://localhost:{port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"📚 API docs available at: http://localhost:{port}/")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )