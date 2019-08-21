from dotenv import load_dotenv
from os import environ
from os.path import join, dirname


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


class AppConfig:
    FLASK_ENV = environ.get('FLASK_ENV')

    EXPLAIN_TEMPLATE_LOADING = environ.get('EXPLAIN_TEMPLATE_LOADING')
