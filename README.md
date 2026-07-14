

# byNolo Site

Modern React portfolio and service hub with optional Flask API backend.

## 🚀 Quick Start

```bash
# Setup (first time)
npm run setup

# Development
npm start

# Production
npm run prod
```

## 📋 Commands

- `npm start` - Start development services
- `npm run prod` - Production server for Cloudflare Tunnel
- `npm run build` - Build for production
- `npm run setup` - Initial setup

## 🔧 Backend CMS

The Flask backend now includes a protected content admin for V2 portfolio content:

- Admin UI: `http://localhost:5000/admin`
- Public API: `http://localhost:5000/api/*`
- Screenshots: served from `/uploads/screenshots/<filename>`

Important backend environment variables live in `api/.env`:

```bash
ADMIN_PASSWORD=change-this-admin-password
SECRET_KEY=change-this-too
UPLOAD_FOLDER=instance/uploads
MAX_UPLOAD_MB=8
DATABASE_URL=sqlite:///bynolo.db
```

Project and hub edit screens support both automatic Playwright capture and manual screenshot uploads. Uploaded images are saved under `UPLOAD_FOLDER/screenshots` and served at `/uploads/screenshots/<filename>`.

After backend dependency install, install the screenshot browser once:

```bash
cd api
venv/bin/pip install -r requirements.txt
venv/bin/python -m playwright install chromium
```

On a headless Ubuntu server, Chromium may also need host libraries:

```bash
sudo apt-get install -y libnss3 libnspr4
```

Useful backend commands:

```bash
cd api
FLASK_APP=run.py venv/bin/flask db upgrade -d migrations
FLASK_APP=run.py venv/bin/flask seed-v2-content
FLASK_APP=run.py venv/bin/flask refresh-screenshots
FLASK_APP=run.py venv/bin/flask check-links
```

## 🌐 Deployment

For Cloudflare Tunnel:
1. `npm run prod`
2. `cloudflared tunnel --url http://localhost:8080`

For full-stack with API:
1. `./prod-fullstack`
2. `cloudflared tunnel --url http://localhost:8080`
3. Admin is available at `/admin` on the same public domain.

See [GUIDE.md](GUIDE.md) for complete documentation.
