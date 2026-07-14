"""backend v2 content fields

Revision ID: 0001_backend_v2_content
Revises:
Create Date: 2026-07-14
"""
from alembic import op
import sqlalchemy as sa

revision = '0001_backend_v2_content'
down_revision = None
branch_labels = None
depends_on = None


CONTENT_COLUMNS = [
    ('slug', sa.String(length=220)),
    ('kicker', sa.String(length=200)),
    ('impact', sa.Text()),
    ('accent', sa.String(length=50), 'green'),
    ('showcase_image_url', sa.String(length=500)),
    ('screenshot_url', sa.String(length=500)),
    ('screenshot_status', sa.String(length=50), 'unknown'),
    ('screenshot_captured_at', sa.DateTime()),
    ('screenshot_error', sa.Text()),
    ('visibility', sa.String(length=50), 'public'),
    ('health_status', sa.String(length=50), 'unknown'),
    ('health_checked_at', sa.DateTime()),
    ('health_error', sa.Text()),
]


def existing_columns(table_name):
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    return {column['name'] for column in inspector.get_columns(table_name)}


def existing_tables():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    return set(inspector.get_table_names())


def add_columns(table_name, columns):
    existing = existing_columns(table_name)
    for item in columns:
        name = item[0]
        column_type = item[1]
        default = item[2] if len(item) > 2 else None
        if name in existing:
            continue
        op.add_column(table_name, sa.Column(name, column_type, nullable=True))
        if default is not None:
            op.execute(sa.text(f"UPDATE {table_name} SET {name} = :default WHERE {name} IS NULL").bindparams(default=default))


def upgrade():
    add_columns('projects', CONTENT_COLUMNS)
    add_columns('hub_items', CONTENT_COLUMNS)

    tables = existing_tables()
    if 'categories' not in tables:
        categories_table = op.create_table(
            'categories',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('slug', sa.String(length=80), nullable=False),
            sa.Column('name', sa.String(length=120), nullable=False),
            sa.Column('description', sa.String(length=300), nullable=True),
            sa.Column('color', sa.String(length=120), nullable=True),
            sa.Column('order_index', sa.Integer(), nullable=True),
            sa.Column('featured', sa.Boolean(), nullable=True),
            sa.Column('created_at', sa.DateTime(), nullable=True),
            sa.Column('updated_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('slug')
        )
        op.create_index('ix_categories_slug', 'categories', ['slug'])
        op.bulk_insert(categories_table, [
            {
                'slug': 'service',
                'name': 'Services',
                'description': 'Infrastructure, APIs, and shared systems',
                'color': 'from-green-400 to-green-600',
                'order_index': 1,
                'featured': True,
            },
            {
                'slug': 'app',
                'name': 'Apps',
                'description': 'Full product experiences and tools',
                'color': 'from-green-400 to-green-600',
                'order_index': 2,
                'featured': True,
            },
            {
                'slug': 'site',
                'name': 'Sites',
                'description': 'Websites, portfolios, and public surfaces',
                'color': 'from-green-400 to-green-600',
                'order_index': 3,
                'featured': True,
            },
            {
                'slug': 'tool',
                'name': 'Tools',
                'description': 'Utilities, automations, and experiments',
                'color': 'from-green-400 to-green-600',
                'order_index': 4,
                'featured': True,
            },
        ])

    if 'site_settings' not in tables:
        op.create_table(
            'site_settings',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('key', sa.String(length=120), nullable=False),
            sa.Column('value', sa.Text(), nullable=True),
            sa.Column('value_type', sa.String(length=40), nullable=True),
            sa.Column('description', sa.String(length=300), nullable=True),
            sa.Column('updated_at', sa.DateTime(), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('key')
        )
        op.create_index('ix_site_settings_key', 'site_settings', ['key'])


def downgrade():
    op.drop_index('ix_site_settings_key', table_name='site_settings')
    op.drop_table('site_settings')
    op.drop_index('ix_categories_slug', table_name='categories')
    op.drop_table('categories')
