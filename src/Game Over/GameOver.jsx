import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dark-theme.css';
import './App.css';

function GameOver() {
  return (
    <div className="dark-theme"> 
      <h1>Game Over</h1>
      <Button style={{backgroundColor: "#1eb980", border: "none"}}>Back to Lobby</Button>
    </div>
  );
}

export default GameOver;