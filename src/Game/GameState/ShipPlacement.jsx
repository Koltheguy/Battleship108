import React, { useState, useEffect } from "react";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, SHIP_TYPES, placeShip, setReady } from "../../firebase";

import Grid from "../Grid/Grid";
import LeaveButton from "../LeaveButton";
import styles from "./ShipPlacement.module.css";

const shipTypes = Object.keys(SHIP_TYPES);

const ShipPlacement = ({ user, gameId, playerNum, gameName }) => {
	const [orientation, setOrientation] = useState("horizontal");
	const [shipsLeft, setShipsLeft] = useState([0, 1, 2, 3, 4, 5]);
	const [gridData, setGridData] = useState({});
	const [gameDoc, isGameDocLoading] = useDocumentData(
		doc(db, "Game", gameId)
	);

	let ready = "";
	if (!isGameDocLoading) ready = gameDoc.ready;

	const shipString = isGameDocLoading
		? ""
		: playerNum === 0
		? gameDoc.ships1
		: gameDoc.ships2;

	useEffect(() => {
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
		setGridData(newGridData);
	}, [gameDoc, shipString, setGridData]);

	const handleNextShip = () => {
		setShipsLeft((prevShipsLeft) => {
			const newShipsLeft = [...prevShipsLeft.slice(1), prevShipsLeft[0]];
			return newShipsLeft;
		});
	};

	const toggleOrientation = () => {
		setOrientation((prevOrientation) =>
			prevOrientation === "horizontal" ? "vertical" : "horizontal"
		);
	};

	const handleCellClick = (position) => {
		placeShip({
			user,
			gameId,
			shipType: shipTypes[shipsLeft[0]],
			position,
			orientation,
		}).then((result) => {
			if (result === 1)
				setShipsLeft((prevShipsLeft) => {
					return prevShipsLeft.slice(1);
				});
		});
	};

	let shipName = null;
	if (shipsLeft.length > 0) {
		shipName = shipTypes[shipsLeft[0]];
		shipName = shipName.charAt(0).toUpperCase() + shipName.slice(1);
	} else {
		setReady({
			gameId,
			ready: playerNum === 0 ? "1" + ready.at(1) : ready.at(0) + 1,
		});
	}

	return (
		<div className={styles.shipPlacement}>
			<div style={{ flex: 3 }}>
				<h1>{gameName}</h1>
				<Grid handleGridClick={handleCellClick} gridData={gridData} />
			</div>
			<div style={{ flex: 2 }}>
				<div style={{ flex: 1 }}>
					<div className={styles.shipDisplay}>
						{shipsLeft.length > 0 ? (
							<>
								<h2>Place Your Ships</h2>
								<h3>Ship: {shipName}</h3>
								<h4>
									Size: {SHIP_TYPES[shipTypes[shipsLeft[0]]]}{" "}
									units
								</h4>
								<h5>Orientation: {orientation}</h5>
								<button onClick={toggleOrientation}>
									Toggle Orientation
								</button>
								<button onClick={handleNextShip}>
									Next Ship
								</button>
							</>
						) : (
							<h2>All Ships Placed, Waiting for opponent...</h2>
						)}
					</div>
					<LeaveButton
						user={user}
						gameId={gameId}
						isLose={false}
						buttonText={"Leave"}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<h3>Reference</h3>
					<Grid handleGridClick={() => {}} gridData={gridData} />
				</div>
			</div>
		</div>
	);
};

export default ShipPlacement;
