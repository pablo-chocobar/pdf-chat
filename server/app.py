from flask import Flask, request
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def home():
    return "Wrong route bro lol"

@app.route("/api/upload", methods=["POST"])
@cross_origin()
def upload():
    if request.method == "POST":
        f = request.files.get("file", "lol")

        if f != "lol":
            path = os.path.join("./uploads", secure_filename(f.filename))
            f.save(path)

            return {"upload_status" : "success"}

        elif f == "lol":
            print("very sad")
            return {"upload_status": "no"}

        else:
            print("kekl")
            return {"upload_status": "unk"}


@app.route("/bot/ask" , methods = ["POST"])
def ask_bot():
    if request.method == "POST":
        req = request.form.get("question" , "lol")

        if req != "lol":
            reply = "hiii!"
            return {"reply_status" : "success" , "answer" : reply}
        else:
            return {"reply_status" : "failed"}
        
    

if __name__ == "__main__":
    app.run(debug=True)