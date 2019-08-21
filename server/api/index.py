from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import base64
import numpy as np

from utils.logger import log_info
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
    prefix = ("data:image/%s;base64," % ext)
    encoded_image = prefix + base64.b64encode(f.read()).decode()
    parts = process_image(encoded_image, ext)
    
    log_info('got parts')
    # buffs = [np.frombuffer(item, dtype=np.float64) for item in parts]
    # log_info('got buff')
    bases = [base64.b64encode(bytes(str(d), encoding="utf-8")) for d in parts]
    log_info('got base')
    images = [prefix + data.decode() for data in bases]

    log_info("got images")
    return jsonify(
        ext=ext,
        original=encoded_image,
        images=images
    )
