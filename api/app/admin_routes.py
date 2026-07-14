from datetime import datetime
from functools import wraps
from flask import Blueprint, current_app, jsonify, redirect, render_template_string, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash
import os
import secrets

from .models import db, Project, HubItem, Category, SiteSetting, ContactSubmission
from .services import (
    VALID_STATUSES,
    VALID_VISIBILITY,
    capture_screenshot,
    check_url_health,
    is_safe_url,
    normalize_bool,
    slugify,
)


admin_bp = Blueprint('admin', __name__, url_prefix='/admin')
admin_api_bp = Blueprint('admin_api', __name__, url_prefix='/api/admin')


def admin_password_hash():
    configured_hash = os.getenv('ADMIN_PASSWORD_HASH')
    if configured_hash:
        return configured_hash
    password = os.getenv('ADMIN_PASSWORD', 'change-me')
    return generate_password_hash(password)


def verify_admin_password(password):
    return check_password_hash(admin_password_hash(), password or '')


def require_admin(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('admin_authenticated'):
            if request.path.startswith('/api/'):
                return jsonify({'error': 'Authentication required'}), 401
            return redirect(url_for('admin.login', next=request.path))
        return view(*args, **kwargs)
    return wrapped


def csrf_token():
    token = session.get('csrf_token')
    if not token:
        token = secrets.token_urlsafe(32)
        session['csrf_token'] = token
    return token


def validate_csrf():
    submitted = request.form.get('csrf_token') or request.headers.get('X-CSRF-Token')
    return submitted and submitted == session.get('csrf_token')


def form_data():
    if request.is_json:
        return request.get_json() or {}
    return request.form.to_dict()


def list_from_value(value):
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return [item.strip() for item in str(value or '').split(',') if item.strip()]


def set_common_fields(record, data):
    title = data.get('title') or data.get('name') or getattr(record, 'title', None) or getattr(record, 'name', '')
    if hasattr(record, 'slug'):
        record.slug = data.get('slug') or record.slug or slugify(title)
    if hasattr(record, 'description') and 'description' in data:
        record.description = data.get('description', '').strip()
    if hasattr(record, 'kicker'):
        record.kicker = data.get('kicker') or None
    if hasattr(record, 'impact'):
        record.impact = data.get('impact') or None
    if hasattr(record, 'accent'):
        record.accent = data.get('accent') or 'green'
    if hasattr(record, 'showcase_image_url'):
        record.showcase_image_url = data.get('showcase_image_url') or None
    if hasattr(record, 'screenshot_url') and data.get('screenshot_url'):
        record.screenshot_url = data.get('screenshot_url')
    if hasattr(record, 'visibility'):
        visibility = data.get('visibility') or 'public'
        record.visibility = visibility if visibility in VALID_VISIBILITY else 'public'
    if hasattr(record, 'featured'):
        record.featured = normalize_bool(data.get('featured'))
    if hasattr(record, 'order_index'):
        try:
            record.order_index = int(data.get('order_index') or 0)
        except ValueError:
            record.order_index = 0


def update_project(project, data):
    project.title = data.get('title', project.title).strip()
    project.description = data.get('description', project.description or '').strip()
    project.github_url = data.get('github_url') or None
    project.live_url = data.get('live_url') or None
    project.status = data.get('status') if data.get('status') in VALID_STATUSES else 'Active'
    project.icon = data.get('icon') or None
    project.icon_type = data.get('iconType') or data.get('icon_type') or 'emoji'
    project.icon_label = data.get('iconLabel') or data.get('icon_label') or None
    project.set_tech_stack(list_from_value(data.get('tech_stack')))
    set_common_fields(project, data)
    return project


def update_hub_item(item, data):
    item.title = data.get('title', item.title).strip()
    item.description = data.get('description', item.description or '').strip()
    item.icon = data.get('icon') or item.icon or 'PanelsTopLeft'
    item.icon_type = data.get('iconType') or data.get('icon_type') or 'lucide'
    item.icon_label = data.get('iconLabel') or data.get('icon_label') or item.title
    item.link = data.get('link') or item.link or '#'
    item.status = data.get('status') if data.get('status') in VALID_STATUSES else 'Active'
    item.color = data.get('color') or 'from-green-400 to-green-600'
    item.set_categories(list_from_value(data.get('categories')))
    set_common_fields(item, data)
    return item


def update_category(category, data):
    category.slug = data.get('slug') or category.slug or slugify(data.get('name'))
    category.name = data.get('name', category.name).strip()
    category.description = data.get('description') or None
    category.color = data.get('color') or 'from-green-400 to-green-600'
    category.featured = normalize_bool(data.get('featured', True))
    try:
        category.order_index = int(data.get('order_index') or 0)
    except ValueError:
        category.order_index = 0
    return category


def update_setting(setting, data):
    setting.key = data.get('key', setting.key).strip()
    setting.value = data.get('value') or ''
    setting.value_type = data.get('value_type') or 'text'
    setting.description = data.get('description') or None
    return setting


def choose_url(record):
    return getattr(record, 'live_url', None) or getattr(record, 'link', None)


def set_screenshot_result(record, result):
    record.screenshot_status = result['status']
    if result.get('url'):
        record.screenshot_url = result['url']
    if result.get('captured_at'):
        record.screenshot_captured_at = result['captured_at']
    record.screenshot_error = result.get('error')


def set_health_result(record, result):
    record.health_status = result['status']
    record.health_checked_at = datetime.utcnow()
    record.health_error = result.get('error')


BASE_TEMPLATE = """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }} · byNolo Admin</title>
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #050806; color: #f8fafc; }
    a { color: #4ade80; text-decoration: none; }
    header { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: rgba(5,8,6,.9); border-bottom: 1px solid rgba(255,255,255,.1); }
    main { max-width: 1200px; margin: 0 auto; padding: 28px 20px 64px; }
    nav { display: flex; flex-wrap: wrap; gap: 14px; }
    table { width: 100%; border-collapse: collapse; margin-top: 18px; }
    th, td { padding: 11px; border-bottom: 1px solid rgba(255,255,255,.1); text-align: left; vertical-align: top; }
    input, textarea, select { width: 100%; box-sizing: border-box; border: 1px solid rgba(255,255,255,.14); border-radius: 10px; background: #0d1712; color: white; padding: 10px; }
    label { display: grid; gap: 6px; color: #d4d4d8; font-size: 13px; }
    form.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin: 18px 0 28px; }
    form.inline { display: inline; }
    button, .button { border: 0; border-radius: 999px; background: #4ade80; color: #041008; font-weight: 700; padding: 9px 14px; cursor: pointer; }
    .secondary { background: rgba(255,255,255,.08); color: #f8fafc; }
    .danger { background: #ef4444; color: white; }
    .card { border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 18px; background: rgba(255,255,255,.04); margin: 16px 0; }
    .muted { color: #a1a1aa; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; }
    img.preview { width: 180px; max-height: 110px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(255,255,255,.1); }
    @media (max-width: 760px) { form.grid { grid-template-columns: 1fr; } table { font-size: 13px; } }
  </style>
</head>
<body>
  <header>
    <strong style="color:#4ade80">byNolo Admin</strong>
    <nav>
      <a href="{{ url_for('admin.dashboard') }}">Dashboard</a>
      <a href="{{ url_for('admin.projects') }}">Projects</a>
      <a href="{{ url_for('admin.hub') }}">Hub</a>
      <a href="{{ url_for('admin.categories') }}">Categories</a>
      <a href="{{ url_for('admin.settings') }}">Settings</a>
      <a href="{{ url_for('admin.contacts') }}">Contacts</a>
      <a href="{{ url_for('admin.logout') }}">Logout</a>
    </nav>
  </header>
  <main>{{ body|safe }}</main>
</body>
</html>
"""


def page(title, body):
    return render_template_string(BASE_TEMPLATE, title=title, body=body)


def csrf_input():
    return f'<input type="hidden" name="csrf_token" value="{csrf_token()}">'


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if verify_admin_password(request.form.get('password')):
            session['admin_authenticated'] = True
            session['csrf_token'] = secrets.token_urlsafe(32)
            return redirect(request.args.get('next') or url_for('admin.dashboard'))
        error = '<p class="card" style="border-color:#ef4444">Invalid admin password.</p>'
    else:
        error = ''

    body = f"""
      <h1>Admin Login</h1>
      {error}
      <form method="post" class="card" style="max-width:420px">
        <label>Password <input type="password" name="password" autofocus required></label>
        <p><button type="submit">Login</button></p>
      </form>
    """
    return page('Login', body)


@admin_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('admin.login'))


@admin_bp.route('/')
@require_admin
def dashboard():
    body = f"""
      <h1>Dashboard</h1>
      <div class="card"><strong>{Project.query.count()}</strong> projects · <strong>{HubItem.query.count()}</strong> hub items · <strong>{ContactSubmission.query.filter_by(status='new').count()}</strong> new contacts</div>
      <p class="muted">Use the sections above to update content, trigger screenshots, check live URLs, and review contact submissions.</p>
    """
    return page('Dashboard', body)


PROJECT_FORM = """
<form method="post" class="grid">
  {csrf}
  <label>Title <input name="title" value="{title}" required></label>
  <label>Slug <input name="slug" value="{slug}"></label>
  <label>Kicker <input name="kicker" value="{kicker}"></label>
  <label>Status <input name="status" value="{status}"></label>
  <label>GitHub URL <input name="github_url" value="{github_url}"></label>
  <label>Live URL <input name="live_url" value="{live_url}"></label>
  <label>Tech stack <input name="tech_stack" value="{tech_stack}"></label>
  <label>Showcase image URL <input name="showcase_image_url" value="{showcase_image_url}"></label>
  <label>Accent <input name="accent" value="{accent}"></label>
  <label>Order <input name="order_index" value="{order_index}" type="number"></label>
  <label>Visibility <select name="visibility"><option value="public">public</option><option value="draft">draft</option><option value="archived">archived</option></select></label>
  <label>Featured <input name="featured" type="checkbox" value="true" {featured}></label>
  <label style="grid-column:1/-1">Description <textarea name="description" rows="3">{description}</textarea></label>
  <label style="grid-column:1/-1">Impact <textarea name="impact" rows="3">{impact}</textarea></label>
  <p><button type="submit">Save project</button></p>
</form>
"""


@admin_bp.route('/projects', methods=['GET', 'POST'])
@require_admin
def projects():
    if request.method == 'POST':
        if not validate_csrf():
            return 'CSRF validation failed', 400
        project = Project(title=request.form.get('title', ''), description='')
        update_project(project, request.form)
        db.session.add(project)
        db.session.commit()
        return redirect(url_for('admin.projects'))

    rows = Project.query.order_by(Project.order_index.asc(), Project.created_at.desc()).all()
    body = '<h1>Projects</h1>' + project_form(Project()) + project_table(rows)
    return page('Projects', body)


@admin_bp.route('/projects/<int:item_id>', methods=['POST'])
@require_admin
def project_update(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    project = Project.query.get_or_404(item_id)
    update_project(project, request.form)
    db.session.commit()
    return redirect(url_for('admin.projects'))


def project_form(project):
    return PROJECT_FORM.format(
        csrf=csrf_input(),
        title=project.title or '',
        slug=project.slug or '',
        kicker=project.kicker or '',
        status=project.status or 'Active',
        github_url=project.github_url or '',
        live_url=project.live_url or '',
        tech_stack=', '.join(project.get_tech_stack()) if project.id else '',
        showcase_image_url=project.showcase_image_url or '',
        accent=project.accent or 'green',
        order_index=project.order_index or 0,
        featured='checked' if project.featured else '',
        description=project.description or '',
        impact=project.impact or '',
    )


def project_table(rows):
    html = ['<table><tr><th>Project</th><th>Preview</th><th>Status</th><th>Actions</th></tr>']
    for row in rows:
        preview = row.screenshot_url or row.showcase_image_url
        preview_html = f'<img class="preview" src="{preview}">' if preview else '<span class="muted">No image</span>'
        html.append(f"""
        <tr>
          <td><strong>{row.title}</strong><br><span class="muted">{row.slug or ''}</span></td>
          <td>{preview_html}</td>
          <td>{row.status}<br><span class="muted">{row.health_status or 'unknown'}</span></td>
          <td class="actions">
            <a class="button secondary" href="{url_for('admin.project_edit', item_id=row.id)}">Edit</a>
            <form class="inline" method="post" action="{url_for('admin.project_screenshot', item_id=row.id)}">{csrf_input()}<button>Screenshot</button></form>
            <form class="inline" method="post" action="{url_for('admin.project_health', item_id=row.id)}">{csrf_input()}<button class="secondary">Health</button></form>
          </td>
        </tr>""")
    html.append('</table>')
    return ''.join(html)


@admin_bp.route('/projects/<int:item_id>/edit')
@require_admin
def project_edit(item_id):
    project = Project.query.get_or_404(item_id)
    return page(f'Edit {project.title}', f'<h1>Edit Project</h1><form method="post" action="{url_for("admin.project_update", item_id=project.id)}" class="grid">{project_form(project).split("<form method=\"post\" class=\"grid\">", 1)[1]}')


HUB_FORM = """
<form method="post" class="grid">
  {csrf}
  <label>Title <input name="title" value="{title}" required></label>
  <label>Slug <input name="slug" value="{slug}"></label>
  <label>Kicker <input name="kicker" value="{kicker}"></label>
  <label>Status <input name="status" value="{status}"></label>
  <label>Link <input name="link" value="{link}"></label>
  <label>Categories <input name="categories" value="{categories}"></label>
  <label>Icon <input name="icon" value="{icon}"></label>
  <label>Icon type <input name="icon_type" value="{icon_type}"></label>
  <label>Showcase image URL <input name="showcase_image_url" value="{showcase_image_url}"></label>
  <label>Accent <input name="accent" value="{accent}"></label>
  <label>Order <input name="order_index" value="{order_index}" type="number"></label>
  <label>Featured <input name="featured" type="checkbox" value="true" {featured}></label>
  <label style="grid-column:1/-1">Description <textarea name="description" rows="3">{description}</textarea></label>
  <label style="grid-column:1/-1">Impact <textarea name="impact" rows="3">{impact}</textarea></label>
  <p><button type="submit">Save hub item</button></p>
</form>
"""


@admin_bp.route('/hub', methods=['GET', 'POST'])
@require_admin
def hub():
    if request.method == 'POST':
        if not validate_csrf():
            return 'CSRF validation failed', 400
        item = HubItem(title=request.form.get('title', ''), description='', icon='PanelsTopLeft', link='#', categories_json='[]')
        update_hub_item(item, request.form)
        db.session.add(item)
        db.session.commit()
        return redirect(url_for('admin.hub'))

    rows = HubItem.query.order_by(HubItem.order_index.asc(), HubItem.created_at.desc()).all()
    body = '<h1>Hub Items</h1>' + hub_form(HubItem()) + hub_table(rows)
    return page('Hub', body)


@admin_bp.route('/hub/<int:item_id>', methods=['POST'])
@require_admin
def hub_update(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    item = HubItem.query.get_or_404(item_id)
    update_hub_item(item, request.form)
    db.session.commit()
    return redirect(url_for('admin.hub'))


@admin_bp.route('/hub/<int:item_id>/edit')
@require_admin
def hub_edit(item_id):
    item = HubItem.query.get_or_404(item_id)
    return page(f'Edit {item.title}', f'<h1>Edit Hub Item</h1><form method="post" action="{url_for("admin.hub_update", item_id=item.id)}" class="grid">{hub_form(item).split("<form method=\"post\" class=\"grid\">", 1)[1]}')


def hub_form(item):
    return HUB_FORM.format(
        csrf=csrf_input(),
        title=item.title or '',
        slug=item.slug or '',
        kicker=item.kicker or '',
        status=item.status or 'Active',
        link=item.link or '',
        categories=', '.join(item.get_categories()) if item.id else '',
        icon=item.icon or 'PanelsTopLeft',
        icon_type=item.icon_type or 'lucide',
        showcase_image_url=item.showcase_image_url or '',
        accent=item.accent or 'green',
        order_index=item.order_index or 0,
        featured='checked' if item.featured else '',
        description=item.description or '',
        impact=item.impact or '',
    )


def hub_table(rows):
    html = ['<table><tr><th>Hub item</th><th>Preview</th><th>Status</th><th>Actions</th></tr>']
    for row in rows:
        preview = row.screenshot_url or row.showcase_image_url
        preview_html = f'<img class="preview" src="{preview}">' if preview else '<span class="muted">No image</span>'
        html.append(f"""
        <tr>
          <td><strong>{row.title}</strong><br><span class="muted">{', '.join(row.get_categories())}</span></td>
          <td>{preview_html}</td>
          <td>{row.status}<br><span class="muted">{row.health_status or 'unknown'}</span></td>
          <td class="actions">
            <a class="button secondary" href="{url_for('admin.hub_edit', item_id=row.id)}">Edit</a>
            <form class="inline" method="post" action="{url_for('admin.hub_screenshot', item_id=row.id)}">{csrf_input()}<button>Screenshot</button></form>
            <form class="inline" method="post" action="{url_for('admin.hub_health', item_id=row.id)}">{csrf_input()}<button class="secondary">Health</button></form>
          </td>
        </tr>""")
    html.append('</table>')
    return ''.join(html)


@admin_bp.route('/categories', methods=['GET', 'POST'])
@require_admin
def categories():
    if request.method == 'POST':
        if not validate_csrf():
            return 'CSRF validation failed', 400
        category = Category(slug=request.form.get('slug') or slugify(request.form.get('name')), name=request.form.get('name', ''))
        update_category(category, request.form)
        db.session.add(category)
        db.session.commit()
        return redirect(url_for('admin.categories'))

    rows = Category.query.order_by(Category.order_index.asc(), Category.name.asc()).all()
    form = f"""
      <form method="post" class="grid">{csrf_input()}
        <label>Name <input name="name" required></label>
        <label>Slug <input name="slug"></label>
        <label>Description <input name="description"></label>
        <label>Color <input name="color" value="from-green-400 to-green-600"></label>
        <label>Order <input type="number" name="order_index" value="0"></label>
        <label>Featured <input type="checkbox" name="featured" value="true" checked></label>
        <p><button>Save category</button></p>
      </form>
    """
    table = '<table><tr><th>Name</th><th>Slug</th><th>Description</th></tr>' + ''.join(
        f'<tr><td>{row.name}</td><td>{row.slug}</td><td>{row.description or ""}</td></tr>' for row in rows
    ) + '</table>'
    return page('Categories', '<h1>Categories</h1>' + form + table)


@admin_bp.route('/settings', methods=['GET', 'POST'])
@require_admin
def settings():
    if request.method == 'POST':
        if not validate_csrf():
            return 'CSRF validation failed', 400
        setting = SiteSetting.query.filter_by(key=request.form.get('key')).first() or SiteSetting(key=request.form.get('key'))
        update_setting(setting, request.form)
        db.session.add(setting)
        db.session.commit()
        return redirect(url_for('admin.settings'))

    rows = SiteSetting.query.order_by(SiteSetting.key.asc()).all()
    form = f"""
      <form method="post" class="grid">{csrf_input()}
        <label>Key <input name="key" required></label>
        <label>Type <input name="value_type" value="text"></label>
        <label style="grid-column:1/-1">Value <textarea name="value" rows="3"></textarea></label>
        <label style="grid-column:1/-1">Description <input name="description"></label>
        <p><button>Save setting</button></p>
      </form>
    """
    table = '<table><tr><th>Key</th><th>Value</th><th>Description</th></tr>' + ''.join(
        f'<tr><td>{row.key}</td><td>{row.value or ""}</td><td>{row.description or ""}</td></tr>' for row in rows
    ) + '</table>'
    return page('Settings', '<h1>Settings</h1>' + form + table)


@admin_bp.route('/contacts')
@require_admin
def contacts():
    rows = ContactSubmission.query.order_by(ContactSubmission.created_at.desc()).all()
    table = ['<h1>Contact Submissions</h1><table><tr><th>From</th><th>Message</th><th>Status</th><th>Actions</th></tr>']
    for row in rows:
        table.append(f"""
        <tr>
          <td><strong>{row.name}</strong><br>{row.email}<br><span class="muted">{row.created_at}</span></td>
          <td><strong>{row.subject or 'No subject'}</strong><br>{row.message}</td>
          <td>{row.status}</td>
          <td>
            <form method="post" action="{url_for('admin.contact_update', item_id=row.id)}" class="actions">
              {csrf_input()}
              <select name="status"><option>new</option><option>read</option><option>responded</option><option>archived</option></select>
              <button>Update</button>
            </form>
          </td>
        </tr>""")
    table.append('</table>')
    return page('Contacts', ''.join(table))


@admin_bp.route('/contacts/<int:item_id>', methods=['POST'])
@require_admin
def contact_update(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    contact = ContactSubmission.query.get_or_404(item_id)
    contact.status = request.form.get('status') if request.form.get('status') in {'new', 'read', 'responded', 'archived'} else contact.status
    if contact.status == 'read' and not contact.read_at:
        contact.read_at = datetime.utcnow()
    db.session.commit()
    return redirect(url_for('admin.contacts'))


@admin_bp.route('/projects/<int:item_id>/screenshot', methods=['POST'])
@require_admin
def project_screenshot(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    project = Project.query.get_or_404(item_id)
    result = capture_screenshot(current_app, choose_url(project), project.slug or project.title)
    set_screenshot_result(project, result)
    db.session.commit()
    return redirect(url_for('admin.projects'))


@admin_bp.route('/hub/<int:item_id>/screenshot', methods=['POST'])
@require_admin
def hub_screenshot(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    item = HubItem.query.get_or_404(item_id)
    result = capture_screenshot(current_app, choose_url(item), item.slug or item.title)
    set_screenshot_result(item, result)
    db.session.commit()
    return redirect(url_for('admin.hub'))


@admin_bp.route('/projects/<int:item_id>/health', methods=['POST'])
@require_admin
def project_health(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    project = Project.query.get_or_404(item_id)
    set_health_result(project, check_url_health(choose_url(project)))
    db.session.commit()
    return redirect(url_for('admin.projects'))


@admin_bp.route('/hub/<int:item_id>/health', methods=['POST'])
@require_admin
def hub_health(item_id):
    if not validate_csrf():
        return 'CSRF validation failed', 400
    item = HubItem.query.get_or_404(item_id)
    set_health_result(item, check_url_health(choose_url(item)))
    db.session.commit()
    return redirect(url_for('admin.hub'))


@admin_api_bp.route('/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    if verify_admin_password(data.get('password')):
        session['admin_authenticated'] = True
        session['csrf_token'] = secrets.token_urlsafe(32)
        return jsonify({'status': 'authenticated', 'csrf_token': session['csrf_token']})
    return jsonify({'error': 'Invalid password'}), 401


@admin_api_bp.route('/logout', methods=['POST'])
@require_admin
def api_logout():
    session.clear()
    return jsonify({'status': 'logged_out'})


@admin_api_bp.route('/projects', methods=['GET', 'POST'])
@require_admin
def api_projects():
    if request.method == 'GET':
        return jsonify({'projects': [project.to_dict() for project in Project.query.order_by(Project.order_index.asc()).all()]})
    project = Project(title='', description='')
    update_project(project, form_data())
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201


@admin_api_bp.route('/projects/<int:item_id>', methods=['GET', 'PUT', 'DELETE'])
@require_admin
def api_project(item_id):
    project = Project.query.get_or_404(item_id)
    if request.method == 'GET':
        return jsonify(project.to_dict())
    if request.method == 'DELETE':
        project.visibility = 'archived'
        project.featured = False
        db.session.commit()
        return jsonify(project.to_dict())
    update_project(project, form_data())
    db.session.commit()
    return jsonify(project.to_dict())


@admin_api_bp.route('/hub', methods=['GET', 'POST'])
@require_admin
def api_hub():
    if request.method == 'GET':
        return jsonify({'items': [item.to_dict() for item in HubItem.query.order_by(HubItem.order_index.asc()).all()]})
    item = HubItem(title='', description='', icon='PanelsTopLeft', link='#', categories_json='[]')
    update_hub_item(item, form_data())
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@admin_api_bp.route('/hub/<int:item_id>', methods=['GET', 'PUT', 'DELETE'])
@require_admin
def api_hub_item(item_id):
    item = HubItem.query.get_or_404(item_id)
    if request.method == 'GET':
        return jsonify(item.to_dict())
    if request.method == 'DELETE':
        item.visibility = 'archived'
        item.featured = False
        db.session.commit()
        return jsonify(item.to_dict())
    update_hub_item(item, form_data())
    db.session.commit()
    return jsonify(item.to_dict())


@admin_api_bp.route('/categories', methods=['GET', 'POST'])
@require_admin
def api_categories():
    if request.method == 'GET':
        return jsonify({'categories': [category.to_dict() for category in Category.query.order_by(Category.order_index.asc()).all()]})
    category = Category(slug=form_data().get('slug') or slugify(form_data().get('name')), name=form_data().get('name', ''))
    update_category(category, form_data())
    db.session.add(category)
    db.session.commit()
    return jsonify(category.to_dict()), 201


@admin_api_bp.route('/contacts', methods=['GET'])
@require_admin
def api_contacts():
    return jsonify({'contacts': [contact.to_dict() for contact in ContactSubmission.query.order_by(ContactSubmission.created_at.desc()).all()]})


@admin_api_bp.route('/contacts/<int:item_id>', methods=['PUT'])
@require_admin
def api_contact(item_id):
    contact = ContactSubmission.query.get_or_404(item_id)
    status = form_data().get('status')
    if status in {'new', 'read', 'responded', 'archived'}:
        contact.status = status
        if status == 'read' and not contact.read_at:
            contact.read_at = datetime.utcnow()
    db.session.commit()
    return jsonify(contact.to_dict())


@admin_api_bp.route('/screenshots/capture', methods=['POST'])
@require_admin
def api_capture_screenshot():
    data = form_data()
    target_type = data.get('type')
    target_id = data.get('id')
    model = Project if target_type == 'project' else HubItem if target_type == 'hub' else None
    if not model or not target_id:
        return jsonify({'error': 'type must be project or hub and id is required'}), 400
    record = model.query.get_or_404(int(target_id))
    result = capture_screenshot(current_app, choose_url(record), record.slug or record.title)
    set_screenshot_result(record, result)
    db.session.commit()
    return jsonify({'result': result, 'item': record.to_dict()})


@admin_api_bp.route('/screenshots/capture-all', methods=['POST'])
@require_admin
def api_capture_all_screenshots():
    results = []
    for model, target_type in ((Project, 'project'), (HubItem, 'hub')):
        for record in model.query.filter(model.featured == True).all():
            if is_safe_url(choose_url(record), allow_relative=False):
                result = capture_screenshot(current_app, choose_url(record), record.slug or record.title)
                set_screenshot_result(record, result)
                results.append({'type': target_type, 'id': record.id, 'result': result})
    db.session.commit()
    return jsonify({'results': results})


@admin_api_bp.route('/health/check', methods=['POST'])
@require_admin
def api_health_check():
    data = form_data()
    target_type = data.get('type')
    target_id = data.get('id')
    records = []
    if target_type and target_id:
        model = Project if target_type == 'project' else HubItem if target_type == 'hub' else None
        if not model:
            return jsonify({'error': 'type must be project or hub'}), 400
        records = [model.query.get_or_404(int(target_id))]
    else:
        records = Project.query.filter(Project.featured == True).all() + HubItem.query.filter(HubItem.featured == True).all()

    results = []
    for record in records:
        result = check_url_health(choose_url(record))
        set_health_result(record, result)
        results.append({'id': record.id, 'title': getattr(record, 'title', ''), 'result': result})
    db.session.commit()
    return jsonify({'results': results})
