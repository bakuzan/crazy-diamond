import cv2
import math


def crop_image(ext, image, rows, columns):
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

            crop_img = img[y: y+h, x: x+w].copy()
            _, buff = cv2.imencode(ext, crop_img)

            results.append(buff)
            img = ogImg

    return results
