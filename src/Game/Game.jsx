import React, { useState } from "react";
import styles from "./Grid.module.css";
import style from "./ChatBox.module.css";
import styling from "./UsersConnectedBox.module.css"
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import ResignButton from "./ResignButton";

const Game = () => {
	const handleResign = () => {
		console.log("Resign action triggered");
	  };

	return <div>
		<Grid />
		<ChatBox />
		<UsersConnectedBox />
		<ResignButton onClick={handleResign} />
	</div>;
};

export default Game;
