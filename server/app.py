from flask import Flask, Blueprint, jsonify, render_template, request, url_for
from flask_cors import CORS
from dotenv import load_dotenv
from os.path import abspath, join, dirname
import os
import math

from database.index import db
from database.models import Puzzle
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

    @app.context_processor
    def utility_processor():
        return dict(len=len, min=min)

    @app.route('/sitemap', methods=['GET'])
    def sitemap():
        return jsonify(list_routes())

    @app.route('/puzzles/', defaults={'page': '1'})
    @app.route('/puzzles/<page>', methods=['GET'])
    def get_puzzles_page(page):
        try:
            max_puzzle_size = os.environ.get("MAX_IMAGE_SIZE", "")
            page_size = 10
            page_number = int(page) if page else 1

            puzzles = Puzzle.query.paginate(
                page_number, page_size, error_out=False)

            next_url = url_for('get_puzzles_page', page=puzzles.next_num) \
                if puzzles.has_next else None
            prev_url = url_for('get_puzzles_page', page=puzzles.prev_num) \
                if puzzles.has_prev else None
            print(next_url)
            return render_template("puzzles.html",
                                   max_puzzle_size=max_puzzle_size,
                                   puzzles=puzzles,
                                   next_url=next_url,
                                   prev_url=prev_url)
        except Exception as e:
            print(e)
            return render_template("index.html")

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
