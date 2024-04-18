import React, { useState, useEffect, useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from "./Lobby.module.css";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactFireStoreContext } from "../ReactFireProvider";

const Lobby = () => {
	const auth = getAuth();
	const handleSignout = (event) => {
		signOut(auth);
	};

	const { displayName, changeUserName } = useContext(ReactFireStoreContext);

	const [username, setUsername] = useState(displayName);

	useEffect(() => {
		setUsername(displayName);
	}, [displayName]);

	// debounce username change
	useEffect(() => {
		const debounceUsernameChange = setTimeout(() => {
			changeUserName(username);
		}, 1500);

		return () => clearTimeout(debounceUsernameChange);
	}, [username, changeUserName]);

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
		<div>
			{/* <h1>Battleship</h1> */}
			{/* username:{username}
			<br />
			<input
				type="text"
				id="username"
				placeholder="Username"
				value={username}
				onChange={handleUsernameChange}
			/> */}
			{/* username:{username} */}
			<div className={styles.user}>
				username: {username}
				<br />
				<input className={styles.input}
					type="text"
					id="username"
					placeholder="Username"
					value={username}
					onChange={handleUsernameChange}
				/>
			</div>
			<h1>Battleship</h1>
			{/* <button className={`${styles.pureMaterial} ${styles.newGame}`}>
				New Game
			</button>
			<button
				className={`${styles.pureMaterial} ${styles.signOut}`}
				onClick={handleSignout}
			>
				Sign out
			</button> */}
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
			{/* <h2>Games</h2> */}
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
		</div>
	);
};

export default Lobby;
