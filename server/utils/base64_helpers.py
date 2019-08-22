import base64
import numpy as np


def base64_url_decode(inp):
    padding_factor = (4 - len(inp) % 4) % 4
    inp += "=" * padding_factor
    # bites = str(inp).translate(dict(zip(map(ord, u'-_'), u'+/')))
    v = base64.urlsafe_b64decode(inp)
    # nparr = np.fromstring(d, dtype=np.uint8)
    # v = base64.decodebytes(b)
    print('YO', v)
    return v
