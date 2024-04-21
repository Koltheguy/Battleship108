import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dark-theme.css';
import './App.css';

function NewGame() {
  const [timer, setTimer] = useState('');
  const handleTimerChange = (event) => setTimer(event.target.value);

  return (
    <div className="dark-theme"> 
      <Form style={{margin: "2rem"}}>
        <h2>Create New Game</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: "2rem"}}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name of game" />
        </Form.Group>
        <Form.Group style={{marginTop: "2rem"}}>
          <Form.Label>Timer</Form.Label>
          <div style={{ display: 'flex' }}>
            {['10s', '20s', '30s'].map((time) => (
              <Form.Check 
                key={time}
                type="radio"
                id={`timer-${time}`}
                label={time}
                value={time}
                checked={timer === time}
                onChange={handleTimerChange}
                style={{ marginRight: "30px" }}
              />
            ))}
          </div>
        </Form.Group>
        <Button variant="success" type="submit" style={{marginTop: "2rem"}}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default NewGame;