import React from "react";
import styles from "./ResignButton.module.css";
import { leaveGame } from "../firebase";

const ResignButton = ({ user, gameId, isPlayer }) => {
	const handleResign = async () => {
		await leaveGame({ user, gameId, isPlayer });
	};

	return (
		<button className={styles.button} onClick={handleResign}>
			{isPlayer ? "Forfeit" : "Leave"}
		</button>
	);
};

export default ResignButton;
