import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import create_app
from database.index import db


MIGRATION_DIR = os.path.join(os.path.dirname(__file__), '..', 'migrations')


def create_manager(app):
    migrate = Migrate(app, db, directory=MIGRATION_DIR)
    manager = Manager(app)

    manager.add_command('db', MigrateCommand)
    return manager


if __name__ == '__main__':
    app = create_app()
    manager = create_manager(app)
    manager.run()
