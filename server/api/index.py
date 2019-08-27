from flask import Blueprint, request, jsonify
from  sqlalchemy.sql.expression import func
from werkzeug.utils import secure_filename
import base64
import numpy as np
import re

from database.index import db
from database.models import Puzzle, Tile
from utils.logger import log_info, log_error
from utils.base64_helpers import base64_url_decode
from utils.image_cropper import process_image

# Create the api blueprint
api_blueprint = Blueprint('czd-api', __name__,
                          url_prefix='/api')


@api_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify(message='pong!')


@api_blueprint.route('/puzzle/<id_>', methods=['GET'])
def get_puzzle(id_):
    try:
        puzzle = Puzzle.query.filter_by(id=id_).first()
        tiles = Tile.query.filter_by(puzzle_id=puzzle.id)
        tiles = [t.serialize() for t in tiles]

        return jsonify(
            success=True,
            original=puzzle.serialize(),
            tiles=tiles
        )
    except Exception as e:
	    return jsonify(success=False, message=str(e))


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
    
    try:
        puzzle = Puzzle(image=encoded_image)
        db.session.add(puzzle)
        db.session.commit()

        for idx, img in enumerate(images):
            tile = Tile(
                puzzle_id=puzzle.id,
                position=idx,
                image= img
            )

            db.session.add(tile)

        db.session.commit()
        return jsonify(success=True, message=puzzle.id)
    except Exception as e:
	    return jsonify(success=False, message=str(e))

@api_blueprint.route('/random-puzzle', methods=['GET'])
def get_random_puzzle():
    try:
        puzzle = Puzzle.query.order_by(func.random()).first()

        return jsonify(
            success=True,
            message=puzzle.id
        )
    except Exception as e:
	    return jsonify(success=False, message=str(e))


@api_blueprint.errorhandler(404)
def page_not_found(error):
    log_error(error)
    return jsonify(error=404, message=str(error)), 404