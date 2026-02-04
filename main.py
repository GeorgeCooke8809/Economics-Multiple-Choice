from flask import Flask, redirect
import flask
import backend

global data
data = backend.Data()

app = Flask(__name__)

@app.route("/", methods = ["GET"])
def index():
    return flask.render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)