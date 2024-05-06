import React from "react";
import "./LeaveButton.module.css";
import { leaveGame } from "../firebase";

const LeaveButton = ({ user, gameId, isLose, buttonText }) => {
	const handleClick = () => {
		leaveGame({ user, gameId, isLose });
	};

	return <button onClick={handleClick}>{buttonText}</button>;
};

export default LeaveButton;
