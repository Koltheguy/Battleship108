import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where, doc, collection } from "firebase/firestore";
import {
	useDocumentData,
	useCollectionData,
} from "react-firebase-hooks/firestore";
import { db, auth, changeUserName, joinGame } from "../firebase";
import NewGame from "./NewGame";
import Game from "../Game/Game";
import styles from "./Lobby.module.css";

const Lobby = () => {
	const [refresh, setRefresh] = useState(true);

	const [user] = useAuthState(auth);
	const { displayName } = user;

	const [userDoc, isUserDocLoading] = useDocumentData(
		doc(db, "User", user.uid)
	);

	if (!isUserDocLoading && !userDoc) {
		signOut(auth);
	}

	const [gameCollection, isGameCollectionLoading] = useCollectionData(
		query(collection(db, "Game"), where("gameState", "in", [0, 1]))
	);

	const [isNewGame, setIsNewGame] = useState(false);
	const toggleNewGamePage = () => {
		setIsNewGame(!isNewGame);
	};

	const handleSignout = (event) => {
		signOut(auth);
	};

	const handleJoin = (event) => {
		joinGame({
			user,
			gameId: event.target.id,
			isPlayer: Number(event.target.value) < 2,
		});
	};

	const [username, setUsername] = useState(displayName);

	useEffect(() => {
		setUsername(displayName);
	}, [displayName]);

	// debounce username change
	useEffect(() => {
		let debounceUsernameChange;
		if (username !== displayName) {
			debounceUsernameChange = setTimeout(() => {
				changeUserName(username).then(() => {
					setRefresh(!refresh); // force update page
				});
			}, 1500);
		}

		return () => clearTimeout(debounceUsernameChange);
	}, [username, displayName, setRefresh, refresh]);

	const handleUsernameChange = async (event) => {
		// allows only alphanumeric inputs
		await setUsername(event.target.value.replace(/[^0-9a-zA-Z]+/gi, ""));
	};
	let wins = null;
	let losses = null;

	if (!isUserDocLoading && userDoc) {
		wins = userDoc.wins;
		losses = userDoc.losses;
	}
	if (!isUserDocLoading && userDoc && userDoc.currentGame !== "") {
		return <Game user={user} gameId={userDoc.currentGame} />;
	} else if (isNewGame) {
		return <NewGame user={user} toggleNewGamePage={toggleNewGamePage} />;
	} else
		return (
			<div className={`${styles.body} ${styles.lobby}`}>
				<h1 className={styles.header}>Battleship</h1>
				<div className={styles.stats}>
					Wins: {wins} Losses: {losses}
				</div>
				<div className={styles.inputs}>
					Username:{" "}
					<input
						className={styles.user}
						type="text"
						id="username"
						placeholder="Random Username"
						value={username}
						onChange={handleUsernameChange}
					/>
					<button
						className={`${styles.pureMaterial} ${styles.newGame}`}
						onClick={toggleNewGamePage}
					>
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
							<th>Join</th>
						</tr>
					</thead>
					<tbody>
						{!isGameCollectionLoading &&
							gameCollection.length > 0 &&
							gameCollection.map((item) => (
								<tr key={item.gameName + item.createdBy}>
									<td>{item.gameName}</td>
									<td>{item.createdBy}</td>
									<td>
										{item.gameState === 0
											? "Setting up"
											: "In Progress"}
									</td>
									<td>
										<button
											className={`${styles.pureMaterial} ${styles.join}`}
											id={item.id}
											value={item.players.length}
											onClick={handleJoin}
										>
											Join
										</button>
									</td>
								</tr>
							))}
						{!isGameCollectionLoading &&
							gameCollection.length < 1 && (
								<>No Games Found, Make a new one!</>
							)}
					</tbody>
				</table>
			</div>
		);
};

export default Lobby;
