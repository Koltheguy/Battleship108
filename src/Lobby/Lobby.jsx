import React from "react";
import { getAuth, signOut } from "firebase/auth";

const Lobby = () => {
	const auth = getAuth();
	const handleSignout = (event) => {
		signOut(auth);
	};
	return <button onClick={handleSignout}>Sign out</button>;
};

export default Lobby;
