import cv2
import time
import base64
import math
import numpy as np


def crop(image, rows, columns):
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
            img = img[y: y+h, x: x+w]

            results.append(img)
            img = ogImg

    return results


def base64_to_cv2(encoded_data):
    d = base64.b64decode(encoded_data)
    nparr = np.fromstring(d, np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)


def process_image(encoded_image):
    image = base64_to_cv2(encoded_image)

    CROP_H_SIZE = 3
    CROP_W_SIZE = 3

    return crop(image, CROP_H_SIZE, CROP_W_SIZE), image
