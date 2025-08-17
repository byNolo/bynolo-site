

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

## 🌐 Deployment

For Cloudflare Tunnel:
1. `npm run prod`
2. `cloudflared tunnel --url http://localhost:8080`

For full-stack with API:
1. `./prod-fullstack`
2. `cloudflared tunnel --url http://localhost`

See [GUIDE.md](GUIDE.md) for complete documentation.
