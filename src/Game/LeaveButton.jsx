import React from "react";
import "./LeaveButton.module.css";
import { leaveGame } from "../firebase";

const LeaveButton = ({ user, gameId, isPlayer, buttonText }) => {
	const handleClick = async () => {
		await leaveGame({ user, gameId, isPlayer });
	};

	return <button onClick={handleClick}>{buttonText}</button>;
};

export default LeaveButton;
