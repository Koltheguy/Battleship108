import React, { useState } from "react";
import styles from "./Grid.module.css";
import style from "./ChatBox.module.css";
import Grid from "./Grid";
import ChatBox from "./ChatBox";

const Game = () => {
	return <div>
		<Grid />
		<ChatBox />
	</div>;
};

export default Game;
