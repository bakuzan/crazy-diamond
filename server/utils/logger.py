import os
import sys
import logging

if "IS_HEROKU" in os.environ:
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
else:
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


logger = logging.getLogger(name="CZD")


def log_info(inp):
    logger.info(inp.encode('utf-8'))

def log_error(inp):
    logger.error(inp.encode('utf-8'))