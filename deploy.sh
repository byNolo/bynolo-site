#!/bin/bash

# Full-stack production deployment script for byNolo site
# Usage: ./deploy.sh [server-user@server-ip] [target-directory]

set -e

SERVER=${1:-"deploy@your-server.com"}
TARGET_DIR=${2:-"/var/www/bynolo-site"}

echo "🚀 Starting full-stack deployment to production..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Test the backend locally (optional)
echo "🧪 Testing backend..."
cd api
if [ -f "requirements.txt" ] && [ -s "requirements.txt" ]; then
    python3 -c "import app; print('✅ Backend imports successfully')" 2>/dev/null || echo "⚠️  Backend test failed, continuing anyway..."
fi
cd ..

# Create deployment package
echo "📋 Creating deployment package..."
mkdir -p deployment/{frontend,backend}
cp -r dist/* deployment/frontend/
cp -r api/* deployment/backend/
cp nginx.conf deployment/
cp supervisord.conf deployment/
tar -czf deployment.tar.gz deployment/

# Upload to server
echo "⬆️  Uploading to server..."
scp deployment.tar.gz $SERVER:/tmp/

# Deploy on server
echo "🔄 Deploying on server..."
ssh $SERVER << EOF
    set -e
    cd $TARGET_DIR
    
    # Extract deployment
    sudo tar -xzf /tmp/deployment.tar.gz --strip-components=1
    sudo chown -R deploy:www-data .
    
    # Update backend virtual environment
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -r backend/requirements.txt
    
    # Update nginx configuration
    sudo cp nginx.conf /etc/nginx/sites-available/bynolo-site
    sudo ln -sf /etc/nginx/sites-available/bynolo-site /etc/nginx/sites-enabled/
    sudo nginx -t
    
    # Update supervisor configuration
    sudo cp supervisord.conf /etc/supervisor/conf.d/bynolo.conf
    
    # Restart services
    sudo systemctl reload nginx
    sudo supervisorctl reread
    sudo supervisorctl update
    sudo supervisorctl restart bynolo-api || sudo supervisorctl start bynolo-api
    
    # Cleanup
    rm /tmp/deployment.tar.gz
    rm -rf deployment/
    
    echo "✅ Full-stack deployment complete!"
    echo "🌐 Frontend: Available at your domain"
    echo "🔧 Backend API: Available at your-domain.com/api/"
    echo "❤️  Health check: your-domain.com/health"
EOF

# Local cleanup
rm -rf deployment/
rm deployment.tar.gz

echo "🎉 Production deployment successful!"
echo ""
echo "📋 Next steps:"
echo "1. Update your domain DNS to point to the server"
echo "2. Set up SSL certificate (Let's Encrypt recommended)"
echo "3. Update CORS origins in backend .env file"
echo "4. Monitor logs: sudo tail -f /var/log/bynolo-api.log"
