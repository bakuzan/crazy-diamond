class Tile:
    def __init__(self, position, image):
        self.position = position
        self.image = image

    def serialize(self):
        return {
            'position': self.position,
            'image': self.image
        }
