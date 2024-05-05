// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import ResignButton from "./ResignButton";
import ShipPlacement from "./ShipPlacement";

const Game = ({ user, gameId, isPlayer }) => {
	return (
		<div>
			<ShipPlacement user={user} gameId={gameId} />
			{/* <Grid />
			<ChatBox />
			<UsersConnectedBox />*/}
			<ResignButton user={user} gameId={gameId} player={isPlayer} />
		</div>
	);
};

export default Game;
