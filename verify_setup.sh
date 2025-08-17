#!/bin/bash

# Complete Database Integration Verification Script
echo "🔍 Verifying Complete Database Integration Setup..."
echo "=================================================="

# Check if services are running
echo "1. 📊 Service Status:"
cd /home/sam/bynolo-site/bynolo-site
./dev status
echo ""

# Check database file exists
echo "2. 🗄️ Database File:"
if [ -f "api/instance/bynolo.db" ]; then
    echo "✅ Database file exists: api/instance/bynolo.db"
    echo "   Size: $(du -h api/instance/bynolo.db | cut -f1)"
else
    echo "❌ Database file not found"
fi
echo ""

# Test API endpoints
echo "3. 🔌 API Endpoint Tests:"

# Test projects endpoint
echo -n "   Projects API: "
if response=$(curl -s http://localhost:5000/api/projects 2>/dev/null); then
    count=$(echo "$response" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['count'])" 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "✅ Working ($count projects)"
    else
        echo "❌ Invalid response"
    fi
else
    echo "❌ Not responding"
fi

# Test stats endpoint
echo -n "   Stats API: "
if response=$(curl -s http://localhost:5000/api/stats 2>/dev/null); then
    if echo "$response" | python3 -c "import sys, json; json.load(sys.stdin)" >/dev/null 2>&1; then
        echo "✅ Working"
    else
        echo "❌ Invalid response"
    fi
else
    echo "❌ Not responding"
fi

# Test hub endpoint
echo -n "   Hub API: "
if response=$(curl -s http://localhost:5000/api/hub 2>/dev/null); then
    count=$(echo "$response" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['count'])" 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "✅ Working ($count items)"
    else
        echo "❌ Invalid response"
    fi
else
    echo "❌ Not responding"
fi

# Test hub categories endpoint
echo -n "   Hub Categories: "
if response=$(curl -s http://localhost:5000/api/hub/categories 2>/dev/null); then
    if echo "$response" | python3 -c "import sys, json; json.load(sys.stdin)" >/dev/null 2>&1; then
        echo "✅ Working"
    else
        echo "❌ Invalid response"
    fi
else
    echo "❌ Not responding"
fi

# Test health endpoint
echo -n "   Health Check: "
if response=$(curl -s http://localhost:5000/health 2>/dev/null); then
    if echo "$response" | grep -q "healthy"; then
        echo "✅ Working"
    else
        echo "❌ Unhealthy"
    fi
else
    echo "❌ Not responding"
fi
echo ""

# Check frontend environment
echo "4. 🌐 Frontend Configuration:"
if [ -f ".env.development" ]; then
    api_url=$(grep VITE_API_URL .env.development | cut -d'=' -f2)
    echo "✅ Development env: $api_url"
else
    echo "❌ Missing .env.development"
fi

if [ -f ".env.production" ]; then
    api_url=$(grep VITE_API_URL .env.production | cut -d'=' -f2)
    echo "✅ Production env: $api_url"
else
    echo "❌ Missing .env.production"
fi
echo ""

# Check backend environment
echo "5. ⚙️ Backend Configuration:"
if [ -f "api/.env" ]; then
    echo "✅ Backend .env file exists"
    database_url=$(grep DATABASE_URL api/.env | cut -d'=' -f2)
    echo "   Database: $database_url"
else
    echo "❌ Missing api/.env"
fi
echo ""

# Test database content
echo "6. 📊 Database Content:"
cd api
if /home/sam/bynolo-site/bynolo-site/.venv/bin/python -c "
from app import create_app
from app.models import db, Project, ContactSubmission, SiteStats, HubItem

app = create_app()
with app.app_context():
    project_count = Project.query.count()
    contact_count = ContactSubmission.query.count()
    stats_count = SiteStats.query.count()
    hub_count = HubItem.query.count()
    print(f'   Projects: {project_count}')
    print(f'   Contact Submissions: {contact_count}')
    print(f'   Statistics: {stats_count}')
    print(f'   Hub Items: {hub_count}')
" 2>/dev/null; then
    echo "✅ Database accessible and populated"
else
    echo "❌ Database access failed"
fi
cd ..
echo ""

# Check frontend integration
echo "7. 🎯 Frontend Integration:"
if grep -q "apiClient.getProjects" src/pages/Projects.jsx; then
    echo "✅ Projects page uses API"
else
    echo "❌ Projects page not using API"
fi

if grep -q "apiClient.submitContactForm" src/pages/Contact.jsx; then
    echo "✅ Contact form uses API"
else
    echo "❌ Contact form not using API"
fi

if grep -q "apiClient.getHubItems" src/pages/Hub.jsx; then
    echo "✅ Hub page uses API"
else
    echo "❌ Hub page not using API"
fi

if [ -f "src/services/api.js" ]; then
    echo "✅ API client configured"
else
    echo "❌ API client missing"
fi
echo ""

echo "=================================================="
echo "🎉 Database Integration Verification Complete!"
echo ""
echo "📋 Summary:"
echo "   • Database: SQLite with Projects, Contacts, Stats, Hub"
echo "   • Backend API: Flask with SQLAlchemy"
echo "   • Frontend: React with API integration"
echo "   • Development: Unified dev script"
echo ""
echo "🚀 Access URLs:"
echo "   • Frontend: http://localhost:5173"
echo "   • Backend API: http://localhost:5000"
echo "   • API Docs: http://localhost:5000/api/*"
