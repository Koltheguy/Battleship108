import React, { useState } from "react";
import styles from "./Game.module.css";
import Grid from "./Grid";
import ChatRoom from "./ChatRoom";

const Game = () => {
	return (
		<>
			<Grid />
			<ChatRoom />
		</>
	);
};

export default Game;
