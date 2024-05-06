import React from "react";
import styles from "./LeaveButton.module.css";
import { leaveGame } from "../firebase";

const LeaveButton = ({ user, gameId, isPlayer, buttonText }) => {
	const handleClick = async () => {
		await leaveGame({ user, gameId, isPlayer });
	};

	return (
		<button className={styles.button} onClick={handleClick}>
			{buttonText}
		</button>
	);
};

export default LeaveButton;
