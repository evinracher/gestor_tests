import React, { useEffect, useState } from 'react';
import Face from './components/Face';
import Messages from './components/Messages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { configureWS } from './services/websocket';

function App() {
  const [list, setList] = useState([]);

  const setListWrapper = (list) => {
    console.log(list)
    setList(list);
  }
  useEffect(() => {
    configureWS(setListWrapper);
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/face">
          <Face list={list} />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/">
          <Redirect to="/messages" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;