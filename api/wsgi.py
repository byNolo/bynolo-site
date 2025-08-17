#!/usr/bin/env python3
"""
WSGI Entry Point for byNolo API
Production entry point for gunicorn
"""

from app import create_app
import os

# Create application instance
application = create_app()

if __name__ == "__main__":
    # This is only used for direct execution (not recommended for production)
    application.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
