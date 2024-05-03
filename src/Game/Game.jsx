// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import ResignButton from "./ResignButton";
// import { leaveGame } from "../firebase";

const Game = ({ user, gameId }) => {
	return (
		<div>
			{/* <button onClick={leaveGame({ user, gameId })}>LEAVE</button> */}
			<Grid />
			<ChatBox />
			<UsersConnectedBox />
			<ResignButton />
			{/* <ResignButton onClick={handleResign} /> */}
		</div>
	);
};

export default Game;
