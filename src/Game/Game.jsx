// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
// import ResignButton from "./ResignButton";

const Game = () => {
	// const handleResign = () => {
	// 	console.log("Resign action triggered");
	// };

	return (
		<div>
			<Grid />
			<ChatBox />
			<UsersConnectedBox />
			{/* <ResignButton onClick={handleResign} /> */}
		</div>
	);
};

export default Game;
