# MOVEMENT CODE
import threading
from time import sleep, time
import RPi.GPIO as GPIO


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

def getARandomInt(from_num = 0, to_num = 10):
  seed = str(round(time()))
  seed = int(seed[len(seed)-1])/10
  return round(seed * (to_num - from_num)) +  from_num

def getARandomElement(array):
  index = getARandomInt(0, len(array) - 1)
  return array[index] 


class MovementControl(threading.Thread):
<<<<<<< HEAD
  emotions=[]
  stop = False

  def __init__(self, emotions):
    threading.Thread.__init__(self)
    self.emotions = emotions
 
  def run(self):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    for motor in MOTORS.keys():
      GPIO.setup(motor, GPIO.OUT)
      GPIO.output(motor, GPIO.LOW)
    print("starting movement")
    self.movement()
    return

  def stop(self):
    self.stop = True

  def movement(self):
    count = 0
    if(len(self.emotions) == 0):
      return
    print("start inmediatly")
    while count < 5:
      if(self.stop == True):
        break
      emotion = getARandomElement(self.emotions)
      print(emotion)
      moves = getARandomElement(MOVES_BY_EMOTION[emotion])
      for move in moves:
        # TODO: think about the wait time
        self.moveMotor(move["motor"], move["deg"])
        # Put a delay here?
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
=======
    emotions = []
    stop = False
    def __init__(self, emotions):
        threading.Thread.__init__(self)
        self.emotions = emotions

    def run(self):
        count = 0
        print(self.emotions)
        while count < 10:
            if self.stop == True:
              break
            time.sleep(1)
            count += 1
            print(count)

    def stop(self):
        self.stop = True
>>>>>>> origin/develop
