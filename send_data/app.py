from flask import Flask, render_template
import text2emotion as te
# import RPi.GPIO as GPIO
import nltk
nltk.download('punkt')

app = Flask(__name__)


@app.route('/on')
def on():
    text = "I was asked to sign a third party contract a week out from stay. If it wasn't an 8 person group that took a lot of wrangling I would have cancelled the booking straight away. Bathrooms - there are no stand alone bathrooms. Please consider this - you have to clear out the main bedroom to use that bathroom. Other option is you walk through a different bedroom to get to its en-suite. Signs all over the apartment - there are signs everywhere - some helpful - some telling you rules. Perhaps some people like this but It negatively affected our enjoyment of the accommodation. Stairs - lots of them - some had slightly bending wood which caused a minor injury."
    print(te.get_emotion(text))
    return render_template('on.html')

@app.route('/off')
def off():
    return render_template('off.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
