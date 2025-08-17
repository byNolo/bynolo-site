# 🚀 byNolo Site - Complete Guide

A modern React portfolio site with optional Flask API backend.

## 🎯 Quick Start

### Development
```bash
# Setup (first time only)
npm run setup

# Start development
npm start          # Both frontend + backend
npm run dev:full   # Same, with visible logs

# Individual services
npm run dev        # Frontend only
npm run dev:backend # Backend only

# Check status
npm run status

# Stop services
npm run stop
```

### Production
```bash
# Full Stack
npm run build
npm run prod:fullstack

# Static Only
npm run prod

# Full-stack with API
./prod-fullstack


```

## 📁 Project Structure

```
bynolo-site/
├── src/                 # React frontend
│   ├── services/api.js  # API client
│   └── ...
├── api/                 # Flask backend
│   ├── app/            # Flask application
│   ├── venv/           # Python environment
│   └── run.py          # Server entry point
├── dist/               # Production build
├── dev                 # Development manager
├── prod                # Production server
├── prod-fullstack      # Full-stack deployment
└── deploy.sh           # Server deployment
```

## 🔧 API Endpoints

Your Flask backend provides:
- `GET /api/projects` - Portfolio projects
- `POST /api/contact` - Contact form
- `GET /api/stats` - Site statistics
- `GET /health` - Health check

