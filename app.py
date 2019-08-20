from flask import Flask, Markup, flash, redirect, render_template, request, session, abort, escape, url_for
from werkzeug.utils import secure_filename
import config

app = Flask(__name__)


@app.route("/")
def index():
    content = Markup("""
    <main class="page">
        <h1 class="page__title">Upload an image to get started</h1>
        <form method="post" enctype="multipart/form-data" action="/upload">
            <div class="control">
                <input class="control__input" type="file" name="file" accept="image/png, image/jpeg" />
                <label>Upload</label>
            </div>

            <button type="submit class="button">Submit</button>
        </form>
    </main>
    """)
    return render_template('index.html', **locals())


@app.route('/upload', methods=['POST'])
def upload_file():
    f = request.files['file']
    return redirect(url_for("puzzle", data=f))


@app.route('/puzzle')
def puzzle():
    print(secure_filename(request.data.filename))
    return "Image uploaded temp"


@app.errorhandler(404)
def not_found(error):
    return render_template('error.html'), 404


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5050)
