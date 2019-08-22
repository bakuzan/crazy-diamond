import base64


def base64_url_decode(inp):
    padding_factor = (4 - len(inp) % 4) % 4
    inp += "=" * padding_factor
    bites = str(inp).translate(dict(zip(map(ord, u'-_'), u'+/')))
    return base64.b64decode(bites)
