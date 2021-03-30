from flask import Flask, Response, json, request, jsonify, make_response
from googletrans import Translator
import text2emotion as t2e
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

translator = Translator()
app = Flask(__name__)

# TESTING PINS
# Probably this is going to change, to run a different file

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

LED = 8

GPIO.setup(LED, GPIO.OUT)

def json_response(payload, status=200):
    return (json.dumps(payload), status,
            {
                'content-type': 'application/json',
                # 'Access-Control-Allow-Origin':'*'
            })


@app.route('/')
def index():
    return "Send a post request to /process with a msg"


@app.route('/process', methods=['POST'])
@cross_origin()
def process():
    print(request.get_data())
    print(request.get_json(force=True))
    print('Recieved from client: {}'.format(request.get_json(force=True)))
    msg = request.get_json()['msg']
    print(msg)
    print("translating...")
    t_msg = translator.translate(msg)
    print(t_msg.text)
    print("Processing...")
    emotion = t2e.get_emotion(t_msg.text)
    print(emotion)
    # emotionsArray = [('Happy', 6.0), ('Surprise', 5.0)]
    emotionsArray = []
    for key, value in emotion.items():
        if(value >= 0.5):
            emotionsArray.append((key, value))
    emotionsArray.sort(key=lambda x: x[1], reverse=True)
    # print(emotionsArray)
    result = []
    for (item, value) in emotionsArray:
        result.append(item)
    print(jsonify(result))
    # res = jsonify(emotion)
    # working:
    return json_response(result)
    # res.headers.add("Access-Control-Allow-Origin", "*")
    # print(res)
    # return res


@app.route('/led', methods=['GET'])
@cross_origin()
def switch():
    state = GPIO.input(LED)

    if state:
        GPIO.output(LED, GPIO.LOW)
        return "OFF"
    else:
        GPIO.output(LED, GPIO.HIGH)
        return "ON"
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
