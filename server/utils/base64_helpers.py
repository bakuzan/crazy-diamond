import base64
import numpy as np


def base64_url_decode(inp):
    padding_factor = (4 - len(inp) % 4) % 4
    inp += "=" * padding_factor
    v = base64.urlsafe_b64decode(inp)
    return v
