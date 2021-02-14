from flask import Flask, render_template
# import RPi.GPIO as GPIO

app = Flask(__name__)


@app.route('/on')
def on():
    return render_template('on.html')

@app.route('/off')
def off():
    return render_template('off.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
