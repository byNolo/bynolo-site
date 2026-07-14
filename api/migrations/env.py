from __future__ import with_statement

from alembic import context
from flask import current_app
from logging.config import fileConfig

config = context.config
fileConfig(config.config_file_name)
target_metadata = current_app.extensions['migrate'].db.metadata


def get_engine():
    return current_app.extensions['migrate'].db.engine


def run_migrations_offline():
    url = current_app.config.get('SQLALCHEMY_DATABASE_URI')
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connection = get_engine().connect()
    context.configure(connection=connection, target_metadata=target_metadata)
    try:
        with context.begin_transaction():
            context.run_migrations()
    finally:
        connection.close()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
