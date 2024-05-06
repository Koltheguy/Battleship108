import React, { useState } from "react";
import Grid from "../Grid/Grid";
import LeaveButton from "../LeaveButton";
import styles from "./ShipPlacement.module.css";
import { SHIP_TYPES, placeShip } from "../../firebase.js";

const shipTypes = Object.keys(SHIP_TYPES);

const ShipPlacement = ({ user, gameId, isPlayer }) => {
	const [currentShipIndex, setCurrentShipIndex] = useState(0);
	const [orientation, setOrientation] = useState("horizontal");
	const [shipsPlaced, setShipsPlaced] = useState([]);

	const handleNextShip = () => {
		let newIndex = currentShipIndex;
		while (shipsPlaced.includes(newIndex)) {
			newIndex =
				currentShipIndex < shipTypes.length - 1
					? currentShipIndex + 1
					: 0;
		}
		setCurrentShipIndex(newIndex);
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
			shipType: shipTypes[currentShipIndex],
			position,
			orientation,
		}).then((result) => {
			if (result === 1) handleNextShip();
			else console.error("Failed to place ship on the grid.");
		});
	};

	let shipName = shipTypes[currentShipIndex];
	shipName = shipName.charAt(0).toUpperCase() + shipName.slice(1);

	return (
		<div className={styles.container}>
			<div style={{ flex: 2 }}>
				<div className={styles.shipDisplay}>
					<h2>Place Your Ships</h2>
					<h3>Ship: {shipName}</h3>
					<h4>
						Size: {SHIP_TYPES[shipTypes[currentShipIndex]]} units
					</h4>
					<h5>Orientation: {orientation}</h5>
					<button onClick={toggleOrientation}>
						Toggle Orientation
					</button>
					<button onClick={handleNextShip}>Next Ship</button>
				</div>
				<Grid handleGridClick={handleCellClick} />
			</div>
			<div style={{ flex: 1 }}>
				<div style={{ flex: 1 }}>
					<LeaveButton
						user={user}
						gameId={gameId}
						player={isPlayer}
						buttonText={"Leave"}
					/>
				</div>
				<div style={{ flex: 1 }}>Bottom Right</div>
			</div>
		</div>
	);
};

export default ShipPlacement;
