# gestor_tests

master is the production branch. This code is intended to be execute on a Raspberry Pi (We used RPi 4).

development is for testing before go to production.

# Instructions

Commands on mac terminal (also raspberry terminal)

## gestor_facing
Run gestor_facing (Robot face):
On raspberry:
`
$ ./run.sh
`

On others devices:
`
$ yarn start
`
## gestor_ws
To run the websocket
`
$ node server.js
`

## emotion_detection
To run the python server
`
$ flask run
`
