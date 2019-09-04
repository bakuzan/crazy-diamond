from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from database.index import db


class Puzzle(db.Model):
    __tablename__ = 'puzzle'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    image = db.Column(db.String(), nullable=False)
    extension = db.Column(db.String(), nullable=False)
    default_size = db.Column(db.Integer, nullable=False)

    def __init__(self, image, extension, default_size):
        self.image = image
        self.extension = extension
        self.default_size = default_size

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'image': self.image,
            'extension': self.extension,
            'defaultSize': self.default_size
        }
