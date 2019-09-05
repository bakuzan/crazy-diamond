import cv2
import math


def make_image_square(image):
    height, width = image.shape[:2]

    if height == width:
        return image

    size = min(height, width)
    diff = abs(height - width)
    deltas = [math.floor(diff/2), math.floor(diff/2)]
    top, bottom, left, right = [0] * 4

    if size == height:
        top, bottom = deltas
    elif size == width:
        left, right = deltas

    return cv2.copyMakeBorder(image, top, bottom, left, right, cv2.BORDER_REPLICATE)
