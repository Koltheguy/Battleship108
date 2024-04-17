import React from "react";
import { getAuth, signOut } from "firebase/auth";
import Game from "../Game/Game";

const Lobby = () => {
	const auth = getAuth();
	const handleSignout = (event) => {
		signOut(auth);
	};
	return <Game />;
};

export default Lobby;
