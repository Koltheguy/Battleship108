import React, { useState } from "react";
import styles from "./Grid.module.css";
import style from "./ChatBox.module.css";
import styling from "./UsersConnectedBox.module.css"
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";

const Game = () => {
	return <div>
		<Grid />
		<ChatBox />
		<UsersConnectedBox />
	</div>;
};

export default Game;
