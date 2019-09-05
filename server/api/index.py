from os import environ
from flask import Blueprint, request, jsonify, abort
from sqlalchemy.sql.expression import func
from werkzeug.utils import secure_filename
import base64
import numpy as np
import re

from database.index import db
from database.models import Puzzle
from models.Tile import Tile
from image_processing.process import process_image
from utils.logger import log_info, log_error
from utils.base64_helpers import base64_url_decode
from utils.solvable_puzzle import create_solvable_puzzle, create_solvable_order

# Create the api blueprint
api_blueprint = Blueprint('czd-api', __name__,
                          url_prefix='/api')


@api_blueprint.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify(message='pong!')


@api_blueprint.route('/puzzle/<id_>', methods=['GET'])
def get_puzzle(id_):
    try:
        size = request.args.get("size")
        puzzle = Puzzle.query.filter_by(id=id_).first()
        puzzle_size = int(size) if size else puzzle.default_size

        parts = process_image(puzzle.image, puzzle_size, puzzle.extension)
        prefix = ("data:image/%s;base64," % puzzle.extension)
        tiles = [Tile(position=i, image=(prefix + base64.b64encode(d).decode()))
                 for i, d in enumerate(parts)]
        tiles = create_solvable_puzzle(tiles)

        return jsonify(
            success=True,
            original=puzzle.serialize(),
            tiles=[t.serialize() for t in tiles],
            maxImageSize=environ.get("MAX_IMAGE_SIZE", "")
        )
    except Exception as e:
        return jsonify(success=False, message=str(e))


@api_blueprint.route('/puzzle', methods=['POST'])
def post_puzzle():
    size = int(request.form.get('size'))
    f = request.files['file']
    name = secure_filename(f.filename)
    ext = name.split('.')[1]
    prefix = ("data:image/%s;base64," % ext)
    encoded_image = prefix + base64.b64encode(f.read()).decode()

    try:
        puzzle = Puzzle(image=encoded_image, extension=ext, default_size=size)
        db.session.add(puzzle)
        db.session.commit()

        return jsonify(success=True, message=puzzle.id)
    except Exception as e:
        return jsonify(success=False, message=str(e))


@api_blueprint.route('/puzzle/<id_>', methods=['DELETE'])
def delete_puzzle(id_):
    try:
        puzzle = Puzzle.query.filter_by(id=id_).first()
        db.session.delete(puzzle)
        db.session.commit()

        return jsonify(success=True)
    except Exception as e:
        return jsonify(success=False, message=str(e))


@api_blueprint.route('/puzzle-order/<size_>', methods=['GET'])
def get_puzzle_order(size_):
    try:
        size = int(size_)
        nums = [i for i in range(size * size)]
        order = create_solvable_order(nums)

        return jsonify(
            success=True,
            tiles=order
        )
    except Exception as e:
        return jsonify(success=False, message=str(e))


@api_blueprint.route('/random-puzzle', methods=['GET'])
def get_random_puzzle():
    try:
        ignore_id = request.args.get("ignorePuzzleId")
        puzzle = Puzzle.query.filter(
            Puzzle.id != ignore_id).order_by(func.random()).first()

        return jsonify(
            success=True,
            message=puzzle.id
        )
    except Exception as e:
        return jsonify(success=False, message=str(e))


@api_blueprint.errorhandler(404)
def api_not_found(error):
    abort(404)
