# MOVEMENT CODE
import threading
from time import sleep

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

LED = 8
MOTOR = 33

GPIO.setup(LED, GPIO.OUT)
GPIO.setup(MOTOR, GPIO.OUT)
GPIO.output(MOTOR, GPIO.LOW)

class MovementControl(threading.Thread):
  emotions=[]
  def __init__(self, emotions):
    threading.Thread.__init__(self)
    self.emotions = emotions

  def run(self):
    count = 0
    print(self.emotions)
    while count < 2:
      sleep(1)
      count+=1
      print(count)
    self.moveMotor(MOTOR,  50)

  def moveMotor(self, motor, deg):
    pwm=GPIO.PWM(motor, 50)
    pwm.start(0)
    pwm.ChangeDutyCycle(5) # left -90 deg position
    sleep(0.5)
    pwm.ChangeDutyCycle(7.5) # neutral position
    sleep(0.5)
    pwm.ChangeDutyCycle(10) # right +90 deg position
    sleep(0.5)
    pwm.stop()

  # destructor
  def __del__(self):
    print("cleaning...")
    GPIO.cleanup()

if __name__ == "__main__":
    print("Executing movement code")
    MovementControl(["Neutral"]).start()
