# MOVEMENT CODE
import threading
from time import sleep
import RPi.GPIO as GPIO
#from random import seed
#from random import randint
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

RIGHT_Z = 32
RIGHT_X = 33
LEFT_Z = 11
LEFT_X = 12
HEAD_Y = 29
HEAD_Z = 31

MOTORS = {
  RIGHT_Z: "RIGHT_Z",
  RIGHT_X: "RIGHT_X",
  LEFT_Z: "LEFT_Z",
  LEFT_X: "LEFT_X",
  HEAD_Y: "HEAD_Y",
  HEAD_Z: "HEAD_Z"
}

MOTOR_MIN = 0
MOTOR_MID = 90
MOTOR_MAX = 180

SERVO_TIME = 0.5
SLEEP_TIME = 1

MOVES_BY_EMOTION = {
  "Neutral" : [
    # gesture 1:
    [
      { "motor": RIGHT_Z, "deg": 180, "wait": 0},
    ],
    # gesture 2:
  ]
}

class MovementControl(threading.Thread):
  emotions=[]
  def __init__(self, emotions):
    threading.Thread.__init__(self)
    self.emotions = emotions
 
  def run(self):
    print(self.emotions)
    for motor in MOTORS.keys():
      GPIO.setup(motor, GPIO.OUT)
      GPIO.output(motor, GPIO.LOW)
      # print("testing  motor " + MOTORS[motor] + " on pin " + str(motor))
      # sleep(5)
      # print("starting...")
      # sleep(3)
      # self.moveMotor(motor,  0)
      # sleep(SLEEP_TIME)
      # self.moveMotor(motor,  180)
      # sleep(SLEEP_TIME)

  def movement():
    count = 0
    while count < 5:
      print(count)
      count+=1
    return

  def moveMotor(self, motor, angle, time = SERVO_TIME):
    pwm=GPIO.PWM(motor, 50)
    pwm.start(0)
    self.setAngle(motor, angle, time, pwm)
    pwm.stop()

  def setAngle(self, motor, angle, time, pwm):
    print("moving: " + MOTORS[motor] + ", " + str(angle) + " degrees" )
    if angle < MOTOR_MIN:
      angle = MOTOR_MIN
    if angle > MOTOR_MAX:
      angle = MOTOR_MAX
    duty = angle / 18 + 2
    GPIO.output(motor, GPIO.LOW)
    pwm.ChangeDutyCycle(duty)
    sleep(time)
    GPIO.output(motor, GPIO.HIGH)
    pwm.ChangeDutyCycle(duty)
    sleep(time)

  # destructor
  def __del__(self):
    print("cleaning...")
    # TODO: Test the cleaning method with the real robot. We need to ensure that the secuence is correct.
    for motor in MOTORS.keys():
      self.moveMotor(motor, MOTOR_MIN)
    GPIO.cleanup()

if __name__ == "__main__":
    print("Executing movement code")
    MovementControl(["Neutral"]).start()
