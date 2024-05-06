// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid/Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import LeaveButton from "./LeaveButton";
import ShipPlacement from "./GameState/ShipPlacement";

import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { db, checkTurn, leaveGame } from "../firebase";
import GameOver from "./GameState/GameOver";

const Game = ({ user, gameId, isPlayer }) => {
	const { playerNum, isCurrent } = checkTurn({ user, gameId });
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	let gameState = false;
	if (!isGameDocLoading && gameDoc && gameDoc.gameState !== "")
		gameState = gameDoc.gameState;
	gameState = 2;

	let renderGame = null;
	switch (gameState) {
		case 0:
			renderGame = (
				<ShipPlacement
					user={user}
					gameId={gameId}
					playerNum={playerNum}
					isCurrent={isCurrent}
					player={isPlayer}
				/>
			);
			break;
		case 1:
			renderGame = (
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
			);
			break;
		case 2:
			renderGame = (
				<GameOver user={user} gameId={gameId} player={isPlayer} />
			);
			break;
		default:
			renderGame = null;
			break;
	}

	return renderGame;
};

export default Game;
