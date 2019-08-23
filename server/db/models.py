from sqlalchemy.dialects.postgresql import UUID
from app import db

class Puzzle(db.Model):
    __tablename__ = 'puzzle'

    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=db.text("uuid_generate_v4()"))
    image = db.Column(db.String())

    def __init__(self, image):
        self.image = image

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'image': self.image,
        }

class Tile(db.Model):
    __tablename__ = 'tile'

    id = db.Column(db.Integer, primary_key=True)
    puzzle_id = db.Column(db.ForeignKey("puzzle.id"))
    position = db.Column(db.Integer)
    image = db.Column(db.String())

    def __init__(self, puzzle_id, position, image):
        self.puzzle_id = puzzle_id
        self.position = position
        self.image = image

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'puzzle_id': self.puzzle_id,
            'position': self.position,
            'image': self.image,
        }