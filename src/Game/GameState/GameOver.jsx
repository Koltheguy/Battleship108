import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./GameOver.module.css";
import LeaveButton from "../LeaveButton";

function GameOver({ user, gameId, gameOverMessage }) {
	return (
		<div className={styles.gameOver}>
			<h1>Game Over</h1>
			<h2 className={styles.center}>{gameOverMessage}</h2>
			<LeaveButton
				user={user}
				gameId={gameId}
				isLose={false}
				buttonText="Back to Lobby"
			/>
		</div>
	);
}

export default GameOver;
