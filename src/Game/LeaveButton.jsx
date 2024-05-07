import React from "react";
import styles from "./LeaveButton.module.css";
import { leaveGame } from "../firebase";

const LeaveButton = ({ user, gameId, isLose, buttonText }) => {
	const handleClick = () => {
		leaveGame({ user, gameId, isLose });
	};

	return <button className={styles.leaveButton} onClick={handleClick}>{buttonText}</button>;
};

export default LeaveButton;
