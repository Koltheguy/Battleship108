import React from "react";
import LeaveButton from "./LeaveButton";

const Spectate = ({ user, gameId }) => {
	return (
		<>
			todo spectate{" "}
			<LeaveButton
				user={user}
				gameId={gameId}
				isLose={false}
				buttonText="Back to Lobby"
			/>
		</>
	);
};

export default Spectate;
