import cv2
import base64
import numpy as np

from square import make_image_square
from scale import scale_image
from crop import crop_image


def base64_to_cv2(encoded_image):
    encoded_data = encoded_image.split(',')[1]
    d = base64.b64decode(encoded_data)
    nparr = np.fromstring(d, dtype=np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)


def process_image(encoded_image, size, ext):
    image = base64_to_cv2(encoded_image)

    CROP_H_SIZE = size
    CROP_W_SIZE = size

    prepro_image = make_image_square(image)
    prepro_image = scale_image(prepro_image)
    return crop_image(ext, prepro_image, CROP_H_SIZE, CROP_W_SIZE)
