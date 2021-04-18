#!/bin/sh
WS_IP=$(hostname -I)
export REACT_APP_WS_IP=$WS_IP
echo "Websocket on $WS_IP"
yarn start HOST=0.0.0.0
