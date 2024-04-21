import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Lobby.module.css";
import { auth, changeUserName } from "../firebase";
import Game from "../Game/Game";

const Lobby = () => {
	const [refresh, setRefresh] = useState(true);

	const [user] = useAuthState(auth);
	const { displayName } = user;

	const handleSignout = (event) => {
		signOut(auth);
	};

	const [username, setUsername] = useState(displayName);

	useEffect(() => {
		setUsername(displayName);
	}, [displayName]);

	// debounce username change
	useEffect(() => {
		const debounceUsernameChange = setTimeout(() => {
			changeUserName(username).then(() => {
				setRefresh(!refresh); // force update page
			});
		}, 1500);

		return () => clearTimeout(debounceUsernameChange);
	}, [username, setRefresh, refresh]);

	const handleUsernameChange = async (event) => {
		// allows only alphanumeric inputs
		await setUsername(event.target.value.replace(/[^0-9a-zA-Z]+/gi, ""));
	};

	// Example data for the table
	const tableData = [
		{ game: 1, name: "Alice", status: "Waiting for players" },
		{ game: 2, name: "Bob", status: "In Progress" },
		{ game: 3, name: "Charlie", status: "Waiting for players" },
	];

	return (
		<div className={styles.body}>
			<div className={styles.user}>
				username: {username}
				<br />
				<input
					className={styles.input}
					type="text"
					id="username"
					placeholder="Username"
					value={username}
					onChange={handleUsernameChange}
				/>
			</div>
			<h1 className={styles.header}>Battleship</h1>
			<div className={styles.button}>
				<button className={`${styles.pureMaterial} ${styles.newGame}`}>
					New Game
				</button>
				<button
					className={`${styles.pureMaterial} ${styles.signOut}`}
					onClick={handleSignout}
				>
					Sign out
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Game</th>
						<th>Created by</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item) => (
						<tr key={item.id}>
							<td>{item.game}</td>
							<td>{item.name}</td>
							<td>{item.status}</td>
							<td>
								<button
									className={`${styles.pureMaterial} ${styles.join}`}
								>
									Join
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Game />
		</div>
	);
};

export default Lobby;
