import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { sendMessage } from '../../services/websocket';

function Messages() {
  const onSubmit = (e) => {
    const msg = e.target.elements.formMessage.value;
    console.log(msg);
    if (msg !== '' && msg.length <= 200) {
      sendMessage(msg)
    }
    e.preventDefault();
  }
  return (
    <Container className="my-5">
      <Form onSubmit={(e) => {
        onSubmit(e)
      }}>
        <Form.Group controlId="formMessage">
          <Form.Label>Enter a new message for gestor</Form.Label>
          <Form.Control type="text" placeholder="Enter your message" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send message
        </Button>
      </Form>
    </Container>
  )
}

export default Messages;

