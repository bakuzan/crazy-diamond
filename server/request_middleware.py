from flask import request, current_app

def log_request_info():
    sep = '-' * 80
    current_app.logger.info(sep)
    current_app.logger.info('Url: %s', request.url)
    # current_app.logger.info('Headers: %s', request.headers)
    current_app.logger.info('Body: %s', request.get_data())
    current_app.logger.info(sep)