from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import base64
import numpy as np
import re

from utils.logger import log_info
from utils.base64_helpers import base64_url_decode
from utils.image_cropper import process_image

# Create the api blueprint
api_blueprint = Blueprint('czd-api', __name__,
                          url_prefix='/api')


@api_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify(message='pong!')


@api_blueprint.route('/puzzle', methods=['GET'])
def get_puzzle():
    print('GET THE PUZZLE')
    data = request.args.get('data')
    ext = request.args.get('ext')
    prefix = ("data:image/%s;base64," % ext)
    print('PRE ENC')
    encoded_image = prefix + base64_url_decode(data)
    print('POST ENC', encoded_image)
    parts = process_image(encoded_image, ext)

    log_info('got parts')
    images = [(prefix + base64.b64encode(d).decode()) for d in parts]
    log_info("got images")
    
    return jsonify(
        ext=ext,
        original=encoded_image,
        images=images
    )


@api_blueprint.route('/puzzle', methods=['POST'])
def post_puzzle():
    f = request.files['file']
    name = secure_filename(f.filename)
    ext = name.split('.')[1]
    prefix = ("data:image/%s;base64," % ext)
    encoded_image = prefix + base64.b64encode(f.read()).decode()
    parts = process_image(encoded_image, ext)
    
    log_info('got parts')
    images = [(prefix + base64.b64encode(d).decode()) for d in parts]
    log_info("got images")
    
    return jsonify(
        ext=ext,
        original=encoded_image,
        images=images
    )
