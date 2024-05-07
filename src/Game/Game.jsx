import React from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, leaveGame, startGame, endGame } from "../firebase";
import LeaveButton from "./LeaveButton";

// import Grid from "./Grid/Grid";
// import ChatBox from "./ChatBox";
// import UsersConnectedBox from "./UsersConnectedBox";
import Spectate from "./Spectate";
import ShipPlacement from "./GameState/ShipPlacement";
import GameOver from "./GameState/GameOver";

const Game = ({ user, gameId }) => {
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	if (isGameDocLoading) return <>Loading</>;

	if (!gameDoc) leaveGame({ user, gameId, isLose: false });

	let gameState = false;
	let isPlayer = null;
	let gameName = "";
	let playerNum = -1;
	let isCurrent = false;
	let isReady = false;
	let isResigned = false;
	let isWinner = false;
	let gameOverMessage = "";
	if (gameDoc.gameState !== "") {
		gameState = gameDoc.gameState;
		isPlayer = gameDoc.players.includes(user.uid);
		gameName = gameDoc.gameName;
		playerNum = gameDoc.players[0] === user.uid ? 0 : 1;
		isCurrent = gameDoc.currentPlayer === playerNum;
		if (gameDoc.currentPlayer === 0) {
			isReady = gameDoc.gameState === 0 && gameDoc.ready === "11";
			if (gameDoc.gameState === 1) {
				isResigned = gameDoc.players.length < 2;
				isWinner = gameDoc.lives1 < 1 || gameDoc.lives2 < 1;
			}
		}
		gameOverMessage = gameDoc.gameOverMessage;
	}

	if (isReady) startGame({ gameId, players: gameDoc.players });
	if (isResigned)
		endGame({
			gameId,
			gameOverMessage: "Player Resigned",
			winner: 0,
			players: gameDoc.players,
		});
	if (isWinner) {
		const winner = gameDoc.lives1 < 1 ? 1 : 0;
		endGame({
			gameId,
			gameOverMessage: `Player ${winner} Wins!`,
			winner,
			players: gameDoc.players,
		});
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
					gameName={gameName}
				/>
			);
			break;
		case 1:
			renderGame = (
				<>
					{/* <Grid />
					<ChatBox />
					<UsersConnectedBox /> */}
					{isCurrent}
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
				<GameOver
					user={user}
					gameId={gameId}
					isPlayer={isPlayer}
					gameOverMessage={gameOverMessage}
				/>
			);
			break;
		default:
			renderGame = null;
			break;
	}

	return renderGame;
};

export default Game;
