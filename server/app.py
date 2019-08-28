from flask import Flask, Blueprint, jsonify, render_template, request
from flask_cors import CORS
from dotenv import load_dotenv
from os.path import abspath, join, dirname
import os

from database.index import db
from utils.request_middleware import log_request_info
from utils.route_list import list_routes
from api.index import api_blueprint


if "IS_PRODUCTION" not in os.environ:
    dotenv_path = abspath(join(dirname(__file__), '..', '.env'))
    load_dotenv(dotenv_path)


def create_app():
    app = Flask(__name__,
                static_url_path="/static",
                static_folder="../dist",
                template_folder="../dist")
    app.config.from_object(os.environ['APP_SETTINGS'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.register_blueprint(api_blueprint)
    CORS(app, resources={r'/api/*': {'origins': '*'}})

    db.init_app(app)
    return app


def setup_app_routes(app):
    @app.before_request
    def watcher():
        log_request_info()

    @app.route('/sitemap', methods=['GET'])
    def sitemap():
        return jsonify(list_routes())

    @app.route('/', defaults={'path': ''})
    @app.route('/<path>')
    def catch_all(path):
        app.logger.info("Catch all, Route > %s" % path)
        return render_template("index.html")

    @app.errorhandler(500)
    def server_error(error):
        app.logger.error(error)
        return jsonify(error=500, message=str(error)), 500


if __name__ == "__main__":
    app = create_app()
    setup_app_routes(app)
    app.run()
