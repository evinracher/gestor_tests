# MOVEMENT CODE
import threading
import time

# import RPi.GPIO as GPIO

# GPIO.setmode(GPIO.BOARD)
# GPIO.setwarnings(False)

# LED = 8

# GPIO.setup(LED, GPIO.OUT)

class MovementControl(threading.Thread):
  emotions=[]
  def __init__(self, emotions):
    threading.Thread.__init__(self)
    self.emotions = emotions

  def run(self):
    count = 0
    print(self.emotions)
    while count < 10:
      time.sleep(1)
      count+=1
      print(count)