from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import base64

from utils.image_cropper import process_image

# Create the api blueprint
api_blueprint = Blueprint('czd-api', __name__,
                          url_prefix='/api')


@api_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify(message='pong!')


@api_blueprint.route('/puzzle', methods=['POST'])
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
