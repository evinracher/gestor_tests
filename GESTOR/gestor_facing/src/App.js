import React, { useEffect, useState } from 'react';
import Face from './components/Face';
import Messages from './components/Messages';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { configureWS } from './services/websocket';

function App() {
  const [msg, setMsg] = useState('');

  const setMsgWrapper = (msg) => {
    setMsg(msg)
  }
  useEffect(() => {
    configureWS(setMsgWrapper);
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/face">
          <Face msg={msg} setMsg={setMsgWrapper} />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/">
          <Face msg={msg} setMsg={setMsgWrapper} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;