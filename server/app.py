from flask import Flask, Blueprint, flash, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import base64

import config
from process import process_image

# instantiate the app
bp = Blueprint('czd-api', __name__,
               template_folder='templates')

app = Flask(__name__)
app.register_blueprint(bp, url_prefix='/api')


# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


@bp.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())


@bp.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify(message='pong!')


@bp.route('/puzzle', methods=['POST'])
def puzzle():
    f = request.files['file']
    name = secure_filename(f.filename)
    ext = name.split('.')[1]
    encoded_image = ("data:image/%s;base64," %
                     ext) + base64.b64encode(f.read())

    parts = process_image(encoded_image)
    images = [(("data:image/%s;base64," % ext) + base64.b64encode(item))
              for item in parts]

    return jsonify(
        ext=ext,
        original=encoded_image,
        images=images
    )


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050)
