import React, { useEffect, useState } from "react";
import LeaveButton from "./LeaveButton";
import Grid from "./Grid/Grid";

const viewGridData = (views, className) => {
	const gridData = {};
	if (!views) return gridData;
	for (let i = 0; i < views.length; i += 2) {
		gridData[`${views[i]}${views[i + 1]}`] = className;
	}
	return gridData;
};

const Spectate = ({
	user,
	gameId,
	gameName,
	hits1,
	misses1,
	hits2,
	misses2,
	currentPlayer,
}) => {
	const [gridData1, setGridData1] = useState({});
	const [gridData2, setGridData2] = useState({});
	useEffect(() => {
		const hitGridData = viewGridData(hits1, "hit");
		const missesGridData = viewGridData(misses1, "miss");
		setGridData1({ ...hitGridData, ...missesGridData });
	}, [setGridData1, hits1, misses1]);

	useEffect(() => {
		const hitGridData = viewGridData(hits2, "hit");
		const missesGridData = viewGridData(misses2, "miss");
		setGridData2({ ...hitGridData, ...missesGridData });
	}, [setGridData2, hits2, misses2]);
	return (
		<>
			<div>
				<h1 style={{ textAlign: "center" }}>{gameName}</h1>
				<LeaveButton
					user={user}
					gameId={gameId}
					isLose={false}
					buttonText="Back to Lobby"
				/>
			</div>
			<div style={{ display: "flex", height: "100vh", width: "100vw" }}>
				<div style={{ flex: 1 }}>
					<h2>
						{currentPlayer === 0 ? "WEAPONS READY" : "RELOADING..."}
					</h2>
					<Grid handleGridClick={() => {}} gridData={gridData1} />
				</div>
				<div style={{ flex: 1 }}>
					<h2>
						{currentPlayer === 1 ? "WEAPONS READY" : "RELOADING..."}
					</h2>
					<Grid handleGridClick={() => {}} gridData={gridData2} />
				</div>
			</div>
		</>
	);
};

export default Spectate;
