from datetime import datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from werkzeug.utils import secure_filename
import os
import re
import secrets
import unicodedata


VALID_STATUSES = {'Active', 'Live', 'Beta', 'Development', 'Planning', 'Archived'}
VALID_VISIBILITY = {'public', 'draft', 'archived'}
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'gif'}


def slugify(value):
    value = unicodedata.normalize('NFKD', value or '').encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^a-zA-Z0-9]+', '-', value).strip('-').lower()
    return value or secrets.token_hex(4)


def is_safe_url(value, allow_relative=True):
    if not value:
        return True
    if allow_relative and value.startswith('/'):
        return True
    parsed = urlparse(value)
    return parsed.scheme in {'http', 'https'} and bool(parsed.netloc)


def normalize_bool(value):
    if isinstance(value, bool):
        return value
    return str(value).lower() in {'1', 'true', 'yes', 'on'}


def upload_root(app):
    configured = app.config.get('UPLOAD_FOLDER') or os.getenv('UPLOAD_FOLDER')
    if configured:
        root = Path(configured)
    else:
        root = Path(app.instance_path) / 'uploads'
    root.mkdir(parents=True, exist_ok=True)
    return root


def screenshot_dir(app):
    path = upload_root(app) / 'screenshots'
    path.mkdir(parents=True, exist_ok=True)
    return path


def public_upload_url(filename):
    return f'/uploads/screenshots/{filename}'


def save_uploaded_screenshot(app, uploaded_file, slug):
    if not uploaded_file or not uploaded_file.filename:
        return {
            'ok': False,
            'status': 'error',
            'error': 'No screenshot file was uploaded.'
        }

    original_name = secure_filename(uploaded_file.filename)
    extension = original_name.rsplit('.', 1)[-1].lower() if '.' in original_name else ''
    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        return {
            'ok': False,
            'status': 'error',
            'error': 'Screenshots must be PNG, JPG, WebP, or GIF files.'
        }

    filename = f'{slugify(slug)}-{datetime.utcnow().strftime("%Y%m%d%H%M%S")}-{secrets.token_hex(3)}.{extension}'
    output_path = screenshot_dir(app) / filename
    uploaded_file.save(output_path)

    return {
        'ok': True,
        'status': 'ready',
        'url': public_upload_url(filename),
        'captured_at': datetime.utcnow(),
        'error': None
    }


def capture_screenshot(app, url, slug, full_page=True):
    if not is_safe_url(url, allow_relative=False):
        return {
            'ok': False,
            'status': 'error',
            'error': 'A valid http(s) URL is required for screenshots.'
        }

    filename = f'{slugify(slug)}-{datetime.utcnow().strftime("%Y%m%d%H%M%S")}.png'
    output_path = screenshot_dir(app) / filename

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return {
            'ok': False,
            'status': 'error',
            'error': 'Playwright is not installed. Run pip install -r api/requirements.txt and python -m playwright install chromium.'
        }

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                headless=True,
                args=['--no-sandbox', '--disable-dev-shm-usage']
            )
            page = browser.new_page(viewport={'width': 1440, 'height': 1000})
            page.goto(url, wait_until='networkidle', timeout=30000)
            page.screenshot(path=str(output_path), full_page=full_page)
            browser.close()
    except Exception as exc:
        return {
            'ok': False,
            'status': 'error',
            'error': str(exc)[:1000]
        }

    return {
        'ok': True,
        'status': 'ready',
        'url': public_upload_url(filename),
        'captured_at': datetime.utcnow()
    }


def check_url_health(url, timeout=8):
    if not is_safe_url(url, allow_relative=False):
        return {
            'status': 'unknown',
            'error': 'No external URL to check.'
        }

    request = Request(url, method='HEAD', headers={'User-Agent': 'byNolo-health-check/1.0'})
    try:
        with urlopen(request, timeout=timeout) as response:
            status_code = response.getcode()
            if 300 <= status_code < 400:
                status = 'redirecting'
            elif 200 <= status_code < 300:
                status = 'online'
            else:
                status = 'error'
            return {'status': status, 'status_code': status_code, 'error': None}
    except HTTPError as exc:
        if exc.code in {405, 403}:
            return _check_url_health_get(url, timeout)
        if 300 <= exc.code < 400:
            status = 'redirecting'
        elif 500 <= exc.code:
            status = 'offline'
        else:
            status = 'error'
        return {'status': status, 'status_code': exc.code, 'error': str(exc)}
    except URLError as exc:
        return {'status': 'offline', 'error': str(exc.reason)}
    except Exception as exc:
        return {'status': 'error', 'error': str(exc)}


def _check_url_health_get(url, timeout):
    request = Request(url, method='GET', headers={'User-Agent': 'byNolo-health-check/1.0'})
    try:
        with urlopen(request, timeout=timeout) as response:
            status_code = response.getcode()
            return {
                'status': 'online' if 200 <= status_code < 300 else 'error',
                'status_code': status_code,
                'error': None
            }
    except Exception as exc:
        return {'status': 'error', 'error': str(exc)}
