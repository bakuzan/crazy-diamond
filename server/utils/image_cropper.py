import cv2
import time
import base64
import math
import numpy as np


def crop(ext, image, rows, columns):
    ext = str("." + ext).replace("..", ".")
    img = image
    ogImg = image
    height, width = image.shape[:2]
    results = []

    for ih in range(rows):
        for iw in range(columns):

            x = math.floor(width/columns * iw)
            y = math.floor(height/rows * ih)
            h = math.floor(height / rows)
            w = math.floor(width / columns)
            print(x, y, h, w)
            crop_img = img[y: y+h, x: x+w].copy()
            _, buff = cv2.imencode(ext, crop_img)

            results.append(buff)
            img = ogImg

    return results


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

def base64_to_cv2(encoded_image):
    encoded_data = encoded_image.split(',')[1]
    d = base64.b64decode(encoded_data)
    nparr = np.fromstring(d, dtype=np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)


def process_image(encoded_image, ext):
    image = base64_to_cv2(encoded_image)

    CROP_H_SIZE = 3
    CROP_W_SIZE = 3
    
    squared_image = make_image_square(image)
    return crop(ext, squared_image, CROP_H_SIZE, CROP_W_SIZE)
