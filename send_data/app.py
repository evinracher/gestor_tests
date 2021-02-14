from flask import Flask, render_template
import RPi.GPIO as GPIO

app = Flask(__name__)

@app.route('/on')
def on():
  return render_template('on.html')