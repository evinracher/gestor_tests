from gpiozero import Servo
from time import sleep

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

MOTOR = 31

GPIO.setup(MOTOR, GPIO.OUT)
GPIO.output(MOTOR, GPIO.LOW)

servo = Servo(MOTOR)
val = -1
S_TIME = 0.5

# References:
# https://www.learnrobotics.org/blog/raspberry-pi-servo-motor/
# https://www.digikey.com/en/maker/blogs/2021/how-to-control-servo-motors-with-a-raspberry-pi


def useAllValues():
        global val
        while True:
                servo.value = val
                sleep(0.1)
                val = val + 0.1
                if val > 1:
                        val = -1

def run():
	while True:
                servo.min()
                sleep(S_TIME)
                servo.mid()
                sleep(S_TIME)
                servo.max()
                sleep(S_TIME)
                        
try:
        run()
except KeyboardInterrupt:
        servo.min()
        sleep(0.5)
        print("Program stopped")
