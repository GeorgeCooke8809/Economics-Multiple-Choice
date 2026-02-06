from flask import Flask, redirect, jsonify, request
import flask
import backend

global data
data = backend.Data()

app = Flask(__name__)

@app.route("/api/get-question", methods=["POST"])
def return_question():
    question_info = data.get_question()

    print(f"{question_info = }")

    return jsonify(question_info)

@app.route("/", methods = ["GET"])
def index():
    return flask.render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)