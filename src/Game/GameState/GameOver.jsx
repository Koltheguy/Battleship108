import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./GameOver.module.css";
import LeaveButton from "../LeaveButton";

function GameOver({ user, gameId, isPlayer }) {
	return (
		<div className={styles.gameOver}>
			<h1>Game Over</h1>
			<LeaveButton
				user={user}
				gameId={gameId}
				player={isPlayer}
				buttonText="Back to Lobby"
			/>
		</div>
	);
}

export default GameOver;
