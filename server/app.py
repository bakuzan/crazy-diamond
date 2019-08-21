from flask import Flask, Blueprint, jsonify
from flask_cors import CORS

from config import AppConfig
from request_middleware import log_request_info
from route_list import list_routes
from api.index import api_blueprint


# instantiate the app
app = Flask(__name__)
app.config.from_object(AppConfig)
app.register_blueprint(api_blueprint)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


@app.before_request
def watcher():
    log_request_info()


@app.route('/sitemap', methods=['GET'])
def sitemap():
    return jsonify(list_routes())


@app.errorhandler(404)
def page_not_found(error):
    app.logger.error(error)
    return jsonify(error=404, message=str(error)), 404


@app.errorhandler(500)
def server_error(error):
    app.logger.error(error)
    return jsonify(error=500, message=str(error)), 500


if __name__ == "__main__":
    app.run()
