// import React, { useState } from "react";
import React from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, checkTurn, leaveGame } from "../firebase";
import LeaveButton from "./LeaveButton";

// import Grid from "./Grid/Grid";
// import ChatBox from "./ChatBox";
// import UsersConnectedBox from "./UsersConnectedBox";
import Spectate from "./Spectate";
import ShipPlacement from "./GameState/ShipPlacement";
import GameOver from "./GameState/GameOver";

const Game = ({ user, gameId }) => {
	const { playerNum, isCurrent } = checkTurn({ user, gameId });
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	if (isGameDocLoading) return <>Loading</>;

	if (!gameDoc) leaveGame({ user, gameId, isLose: false });

	let gameState = false;
	let isPlayer = null;
	if (gameDoc.gameState !== "") {
		gameState = gameDoc.gameState;
		isPlayer = gameDoc.players.includes(user.uid);
	}

	let renderGame = null;
	if (!isPlayer) return <Spectate />;
	switch (gameState) {
		case 0:
			renderGame = (
				<ShipPlacement
					user={user}
					gameId={gameId}
					playerNum={playerNum}
				/>
			);
			break;
		case 1:
			renderGame = (
				<>
					{/* <Grid />
					<ChatBox />
					<UsersConnectedBox /> */}
					<LeaveButton
						user={user}
						gameId={gameId}
						isLose={isPlayer}
						buttonText={isPlayer ? "Forefeit" : "Leave"}
					/>
				</>
			);
			break;
		case 2:
			renderGame = (
				<GameOver user={user} gameId={gameId} isPlayer={isPlayer} />
			);
			break;
		default:
			renderGame = null;
			break;
	}

	return renderGame;
};

export default Game;
