from os import environ
import cv2


def scale_image(image):
    max_image_size = environ.get("MAX_IMAGE_SIZE")

    if max_image_size == None:
        return image

    max_image_size = int(max_image_size)
    size = image.shape[0]
    if size <= max_image_size:
        return image

    scale = max_image_size / size
    return cv2.resize(image, (0, 0), fx=scale, fy=scale)
