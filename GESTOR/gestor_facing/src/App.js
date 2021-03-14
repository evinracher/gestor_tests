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
  const [msg, setMsg] = useState();
  useEffect(() => {
    configureWS(setMsg);
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/face">
          <Face msg={msg} setMsg={setMsg} />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/">
          <Face />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;