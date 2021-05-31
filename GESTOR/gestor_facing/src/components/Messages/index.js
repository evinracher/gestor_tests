import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { sendList, isOpen } from '../../services/websocket';

function Messages() {
  const [list, setList] = useState([
    'Hola, mi nombre es Gestor. Recuerda lavarte las manos para prevenir el Covid',
    'Hola, soy Gestor y estoy feliz de ayudarte',
    'Saludos, soy Gestor, el robot informativo del Laboratorio de Control Digital'
  ]);
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const saveItem = () => {
    const newList = [...list];
    const msg = message;
    if (msg !== '' && msg.length <= 200 && !list.includes(msg)) {
      if (editing) {
        newList[index] = message;
        setEditing(false);
      } else {
        newList.push(msg);
      }
      setError('');
      setList(newList);
      setMessage('');
    } else {
      setError('Error: Please review the message is not repeated and has less than 200 characters.');
    }
  }

  const deleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  const editItem = (index) => {
    const msg = list[index];
    setMessage(msg);
    setEditing(true);
    setIndex(index);
  }

  const send = (e) => {
    setSending(true);
    if (isOpen()) {
      sendList(list);
      setError('');
    } else {
      setError("Disabled server. Please try later.")
    }
    setTimeout(() => {
      setSending(false);
    }, 2000);
    e.preventDefault();
  }

  return (
    <Container className="my-5">
      <h3>Messages</h3>
      <ul className="list-group mb-5">
        {list.map((item, index) => {
          return (
            <li className="row list-group-item d-flex align-items-center justify-content-between" key={index}>
              <p className="col-8 col-sm-10 m-0">{item}</p>
              <div className="col mw-5">
                <button className="btn btn-warning btn-sm mr-2 mb-2" onClick={() => editItem(index)}>Edit</button>
                <button className="btn btn-danger btn-sm mb-2" onClick={() => deleteItem(index)}>Delete</button>
              </div>
            </li>)
        })}
      </ul>
      <Form onSubmit={(e) => {
        send(e);
      }}>
        <div className="d-flex align-items-start my-3">
          <Form.Group className="flex-fill" controlId="formMessage">
            <Form.Control
              type="text"
              placeholder="Enter a new message for gestor"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            {error ? (<span className="text-danger">{error}</span>) : ''}
          </Form.Group>
          <Button className="ml-4" onClick={saveItem} disabled={!message}>{editing ? "Save" : "Add"}</Button>
        </div>
        <Button variant="success" disabled={!list.length || sending} type="submit" >
          Send
        </Button>
      </Form>
    </Container>
  )
}

export default Messages;

