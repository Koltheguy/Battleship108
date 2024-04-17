import React, { useState, useEffect, useContext } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Game from "../Game/Game";
import { useUser } from "reactfire";
import { ReactFireStoreContext } from "../ReactFireProvider";

const Lobby = () => {
	const { displayName, uid, changeUserName } = useContext(
		ReactFireStoreContext
	);
	const auth = getAuth();
	const handleSignout = async (event) => {
		await signOut(auth);
	};

	const [username, setUsername] = useState(displayName);

	// debounce username change
	useEffect(() => {
		const debounceUsernameChange = setTimeout(() => {
			changeUserName(username);
		}, 1500);

		return () => clearTimeout(debounceUsernameChange);
	}, [username]);

	const handleUsernameChange = async (event) => {
		await setUsername(event.target.value);
	};

	return (
		<>
			<input
				type="text"
				id="username"
				placeholder="Username"
				value={username}
				onChange={handleUsernameChange}
			/>
			<Game />
		</>
	);
};

export default Lobby;
