import React, { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, attack, view } from "../../firebase";

import Grid from "../Grid/Grid";
import LeaveButton from "../LeaveButton";
import styles from "./Gameplay.module.css";

const Gameplay = ({ user, gameId, playerNum, gameName, isCurrent }) => {
	const [gridData1, setGridData1] = useState({});
	const [gridData2, setGridData2] = useState({});
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	const shipString = isGameDocLoading
		? ""
		: playerNum === 0
		? gameDoc.ships1
		: gameDoc.ships2;

	let hitsOther;
	let missesOther;
	let hitsSelf;
	let missesSelf;

	useEffect(() => {
		//own ships
		let tempShipString = shipString;
		const newGridData = {};
		while (tempShipString.length > 0) {
			const shipLength = tempShipString.at(0);
			const shipCoords = tempShipString.slice(1, shipLength * 2 + 1);
			for (let i = 0; i < shipLength; i++) {
				newGridData[
					`${shipCoords.at(i * 2)}${shipCoords.at(i * 2 + 1)}`
				] = "ship";
			}
			tempShipString = tempShipString.slice(shipLength * 2 + 1);
		}
		setGridData2(newGridData);
	}, [gameDoc, shipString, setGridData2]);

	const handleCellClick = (position) => {
		if (!isCurrent) return;
		attack({
			user,
			gameId,
			playerNum: playerNum === 0 ? 1 : 0,
			isCurrent,
			position,
			hits: hitsOther,
			misses: missesOther,
		});
	};

	return (
		<div className={styles.gameplay}>
			<div style={{ flex: 3 }}>
				<h1>{gameName}</h1>
				<Grid handleGridClick={handleCellClick} gridData={gridData1} />
			</div>
			<div style={{ flex: 2 }}>
				<div style={{ flex: 1 }}>
					<LeaveButton
						user={user}
						gameId={gameId}
						isLose={false}
						buttonText={"Leave"}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<h3>Reference</h3>
					<Grid handleGridClick={() => {}} gridData={gridData2} />
				</div>
			</div>
		</div>
	);
};

export default Gameplay;
