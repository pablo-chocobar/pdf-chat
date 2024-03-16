from flask import Flask, request
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
from rag import RAG
import RSA
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
rag_pipe = RAG()

key_pair = RSA.generate_RSA_key_pair()
public_key, private_key = key_pair["public_key"] , key_pair["private_key"]


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
            
            rag_pipe.load_pdf(path = path)

            return {"upload_status" : "success"}

        elif f == "lol":
            print("very sad")
            return {"upload_status": "no"}

        else:
            print("kekl")
            return {"upload_status": "unk"}


@app.route("/bot/getkey" , methods = ["GET"])
def get_key():
    if request.method == "GET":
        global public_key
        return {"botkey" : public_key}

@app.route("/bot/ask" , methods = ["POST"])
def ask_bot():
    if request.method == "POST":
        question = request.form.get("question" , "lol")
        userkey = request.form.get("userkey" , "lol")

        if question != "lol" and userkey != "lol":
            global key_pair , public_key , private_key
            reply = "hiii!"

            question = json.loads(question)
            temp_userkey = json.loads(userkey)
            userkey = [temp_userkey["e"] , temp_userkey["n"]]
            question = RSA.decrypt_RSA(question , private_key)
            reply = rag_pipe.ask(question)

            key_pair = RSA.generate_RSA_key_pair()
            public_key, private_key = key_pair["public_key"] , key_pair["private_key"]

            reply = RSA.encrypt_RSA(reply , userkey)

            return {"reply_status" : "success" , "answer" : reply , "botkey" : public_key}
        else:
            return {"reply_status" : "failed"}
        

if __name__ == "__main__":
    app.run(debug=True)