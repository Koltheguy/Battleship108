import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "GameOver.module.css";

function GameOver() {
	return (
		<div className={styles.gameOver}>
			<h1>Game Over</h1>
			<Button style={{ backgroundColor: "#1eb980", border: "none" }}>
				Back to Lobby
			</Button>
		</div>
	);
}

export default GameOver;
