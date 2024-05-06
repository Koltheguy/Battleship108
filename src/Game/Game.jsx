// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid/Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import LeaveButton from "./LeaveButton";
import ShipPlacement from "./ShipPlacement";

import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { db, checkTurn, leaveGame } from "../firebase";

const Game = ({ user, gameId, isPlayer }) => {
	const { playerNum, isCurrent } = checkTurn({ user, gameId });
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	let gameState = false;
	if (!isGameDocLoading && gameDoc && gameDoc.gameState !== "")
		gameState = gameDoc.gameState;

	return (
		<div>
			{gameState === 0 ? (
				<ShipPlacement
					user={user}
					gameId={gameId}
					playerNum={playerNum}
					isCurrent={isCurrent}
					player={isPlayer}
				/>
			) : gameState === 1 ? (
				<>
					{/* <Grid /> */}
					<ChatBox />
					<UsersConnectedBox />
					<LeaveButton
						user={user}
						gameId={gameId}
						player={isPlayer}
						buttonText={isPlayer ? "Forefeit" : "Leave"}
					/>
				</>
			) : gameState === 2 ? (
				leaveGame({ user, gameId, isPlayer })
			) : null}
		</div>
	);
};

export default Game;
