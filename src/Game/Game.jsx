// import React, { useState } from "react";
import React from "react";
import Grid from "./Grid";
import ChatBox from "./ChatBox";
import UsersConnectedBox from "./UsersConnectedBox";
import ResignButton from "./ResignButton";
import ShipPlacement from "./ShipPlacement";
import GameOver from "../Game Over/GameOver";

import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { db, checkTurn } from "../firebase.js";

const Game = ({ user, gameId, isPlayer }) => {
	const { playerNum, isCurrent } = checkTurn();
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
				/>
			) : gameState === 1 ? (
                <>
                    <Grid />
                    <ChatBox />
                    <UsersConnectedBox />
                    <ResignButton user={user} gameId={gameId} player={isPlayer} />
                </>
            ) : gameState === 2 ? (
                <GameOver />
            ) : null}
        </div>
    );
};

export default Game;
