# Gunicorn configuration file for byNolo API
# Production configuration with optimized settings

import multiprocessing
import os

# Server socket
bind = "0.0.0.0:5000"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 120
keepalive = 5

# Restart workers after this many requests, with jitter
max_requests = 1000
max_requests_jitter = 100

# Logging
accesslog = "logs/gunicorn-access.log"
errorlog = "logs/gunicorn-error.log"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "bynolo-api"

# Server mechanics
daemon = False
pidfile = "logs/gunicorn.pid"
user = None
group = None
tmp_upload_dir = None

# SSL (uncomment if using HTTPS)
# keyfile = "/path/to/keyfile"
# certfile = "/path/to/certfile"

# Environment
raw_env = [
    "FLASK_ENV=production",
    "FLASK_DEBUG=false"
]

# Preload application for better memory usage
preload_app = True

# Hook for initializing logs directory
def on_starting(server):
    """Called just before the master process is initialized."""
    import os
    os.makedirs("logs", exist_ok=True)
