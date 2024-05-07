import React, { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, attack } from "../../firebase";

import Grid from "../Grid/Grid";
import LeaveButton from "../LeaveButton";
import styles from "./Gameplay.module.css";

const viewGridData = (views, className) => {
	const gridData = {};
	if (!views) return gridData;
	for (let i = 0; i < views.length; i += 2) {
		gridData[`${views[i]}${views[i + 1]}`] = className;
	}
	return gridData;
};

const Gameplay = ({
	user,
	gameId,
	playerNum,
	gameName,
	isCurrent,
	hits,
	misses,
	hitsSelf,
	missesSelf,
}) => {
	const [refresh, setRefresh] = useState(false);
	const [gridDataOther, setGridDataOther] = useState({});
	const [gridDataSelf, setGridDataSelf] = useState({});
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	const shipString = isGameDocLoading
		? ""
		: playerNum === 0
		? gameDoc.ships1
		: gameDoc.ships2;

	useEffect(() => {
		const hitGridData = viewGridData(hits, "hit");
		const missesGridData = viewGridData(misses, "miss");
		setGridDataOther({ ...hitGridData, ...missesGridData });
	}, [setGridDataOther, hits, misses]);

	useEffect(() => {
		//own ships
		let tempShipString = shipString;
		const shipGridData = {};
		while (tempShipString.length > 0) {
			const shipLength = tempShipString.at(0);
			const shipCoords = tempShipString.slice(1, shipLength * 2 + 1);
			for (let i = 0; i < shipLength; i++) {
				shipGridData[
					`${shipCoords.at(i * 2)}${shipCoords.at(i * 2 + 1)}`
				] = "ship";
			}
			tempShipString = tempShipString.slice(shipLength * 2 + 1);
		}
		const hitGridData = viewGridData(hitsSelf, "hit");
		const missesGridData = viewGridData(missesSelf, "miss");

		setGridDataSelf({ ...shipGridData, ...hitGridData, ...missesGridData });
	}, [shipString, setGridDataSelf, hitsSelf, missesSelf]);

	const handleCellClick = (position) => {
		if (!isCurrent) return;
		attack({
			position,
			user,
			gameId,
			playerNum: playerNum === 0 ? 1 : 0,
			isCurrent,
			hits,
			misses,
		}).then(() => {
			setRefresh(!refresh); //force update
		});
	};

	return (
		<div className={styles.gameplay}>
			<div style={{ flex: 3 }}>
				<h1>{gameName}</h1>
				<h2>{isCurrent ? "WEAPONS READY" : "RELOADING..."}</h2>
				<Grid
					handleGridClick={handleCellClick}
					gridData={gridDataOther}
				/>
			</div>
			<div style={{ flex: 2 }}>
				<div style={{ flex: 1 }}>
					<LeaveButton
						user={user}
						gameId={gameId}
						isLose={true}
						buttonText={"Forefeit"}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<h3>Reference</h3>
					<Grid handleGridClick={() => {}} gridData={gridDataSelf} />
				</div>
			</div>
		</div>
	);
};

export default Gameplay;
