//#region imports
import firebase from "firebase/compat/app";
import { getAuth, updateProfile } from "firebase/auth";
import {
	getFirestore,
	getDoc,
	//getDocs,
	//deleteDoc,
	addDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	increment,
	arrayRemove,
	doc,
	collection,
	serverTimestamp,
	getCountFromServer,
	query,
	where,
	documentId,
} from "firebase/firestore";
import {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
	languages,
} from "unique-names-generator";

import {
	TextCensor,
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";
//#endregion
const GRID_SIZE = 10;
const SHIP_TYPES = {
	carrier: 5,
	battleship: 4,
	cruiser: 3,
	destroyer: 3,
	frigate: 2,
	corvette: 2,
};

const LIVES_TOTAL = 19;

const app = firebase.initializeApp({
	// client requires this to access firestore
	apiKey: "AIzaSyCYYAnZIkl31Gi3S_ApU4XC8s4QuC83Cus",
	authDomain: "battleship108-7ddfc.firebaseapp.com",
	databaseURL: "https://battleship108-7ddfc-default-rtdb.firebaseio.com",
	projectId: "battleship108-7ddfc",
	storageBucket: "battleship108-7ddfc.appspot.com",
	messagingSenderId: "463046283845",
	appId: "1:463046283845:web:298795cfee030bf480c92c",
	measurementId: "G-WB23V65S09",
});
const auth = getAuth(app);
const db = getFirestore(app);

const obscenityMatcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});
const xStrategy = (ctx) => "X".repeat(ctx.matchLength);
const censor = new TextCensor().setStrategy(xStrategy);
//#region user
const changeUserName = async (name) => {
	if (name === null) name = "";
	name = name.replace(/[^0-9a-zA-Z]+/gi, "");
	if (!auth || !auth.currentUser) return;
	const matches = obscenityMatcher.getAllMatches(name);
	let cleanedName = censor.applyTo(name, matches);

	if (!cleanedName || cleanedName.length < 3 || cleanedName.length > 21) {
		cleanedName = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
			separator: "",
			style: "capital",
			seed: Date.now(),
		});
	}
	console.info("name change", cleanedName);

	updateProfile(auth.currentUser, {
		displayName: cleanedName,
	});

	updateDoc(doc(db, "User", auth.currentUser.uid), {
		displayName: cleanedName,
	});
};
const initializeUser = async (user) => {
	const snap = await getCountFromServer(
		query(collection(db, "User"), where(documentId(), "==", user.uid))
	);

	if (!snap.data().count) {
		setDoc(doc(db, "User", user.uid), {
			wins: 0,
			loses: 0,
			gamesPlayed: 0,
			currentGame: "",
			isChatBanned: false,
		});
		await changeUserName(user.displayName);
	}
};
//#endregion

//#region game
const newGame = async ({ user, gameName, timer }) => {
	switch (timer) {
		case "10s":
			timer = 10;
			break;
		case "20s":
			timer = 20;
			break;
		default:
		case "30s":
			timer = 30;
			break;
	}
	if (gameName === "")
		gameName = `The ${uniqueNamesGenerator({
			dictionaries: [colors, adjectives, languages],
			separator: " ",
			style: "capital",
			seed: Date.now(),
		})} Battle`;

	const docRef = await addDoc(collection(db, "Game"), {
		gameName: gameName,
		createdBy: user.displayName,
		timer: timer,
		players: [user.uid],
		spectate: [],
		gameState: 0,
		turn: 0,
		currentPlayer: 0,
		timeStarted: serverTimestamp(),
		winner: "",
		lives1: LIVES_TOTAL,
		visible1X: "",
		visible1Y: "",
		ships1X: "",
		ships1Y: "",

		lives2: LIVES_TOTAL,
		visible2X: "",
		visible2Y: "",
		ships2X: "",
		ships2Y: "",
	});

	const gameId = docRef.id;
	// console.log(gameId);
	updateDoc(doc(db, "User", user.uid), {
		currentGame: gameId,
	});
};
const joinGame = async ({ user, gameId, isPlayer }) => {
	if (isPlayer)
		updateDoc(doc(db, "Game", gameId), {
			players: arrayUnion(user.uid),
			currentGame: gameId,
		});
	else
		updateDoc(doc(db, "Game", gameId), {
			spectate: arrayUnion(user.uid),
			currentGame: gameId,
		});
};
const leaveGame = async ({ user, gameId, isPlayer }) => {
	if (isPlayer) {
		updateDoc(doc(db, "Game", gameId), {
			players: arrayRemove(user.uid),
		});
		updateDoc(doc(db, "User", user.uid), {
			currentGame: "",
			loses: increment(1),
			gamesPlayed: 0,
		});
	} else {
		updateDoc(doc(db, "Game", gameId), {
			spectate: arrayRemove(user.uid),
		});
		updateDoc(doc(db, "User", user.uid), {
			currentGame: "",
		});
	}
};
//#endregion

//#region game setup
const getShips = async ({ gameId, playerNum }) => {
	const docSnap = await getDoc(doc(db, "Game", gameId));
	const ships = [];
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (playerNum === 0) {
			for (let i = 0; i < data.ships1X.length; i++) {
				ships.push([Number(data.ships1X[i]), Number(data.ships1Y[i])]);
			}
		} else if (playerNum === 1) {
			for (let i = 0; i < data.ships2X.length; i++) {
				ships.push([Number(data.ships2X[i]), Number(data.ships2Y[i])]);
			}
		}
	}
	return ships;
};

const checkHit = ({ hit, ships }) => {
	return ships.some((ship) => {
		return ship[0] === hit[0] && ship[1] === hit[1];
	});
};

const placeShip = async ({ user, gameId, shipType, position, orientation }) => {
	//return -1 if fail
	//return 1 if succeed
	console.log({ shipType, position, orientation });
	if (!SHIP_TYPES.hasOwnProperty(shipType)) return -1;
	if (orientation !== "horizontal" && orientation !== "vertical") return -1;
	if (position[0] < 0 || position[1] < 0) return -1;
	const shipSize = SHIP_TYPES[shipType];
	if (orientation === "horizontal") {
		if (position[0] + shipSize >= GRID_SIZE) return -1;
	} else {
		if (position[1] + shipSize >= GRID_SIZE) return -1;
	}
	const { playerNum } = checkTurn({ user, gameId });
	const ships = await getShips({ gameId, playerNum });
	console.log(ships);

	const shipCoords = [];
	if (orientation === "horizontal") {
		for (let i = 0; i < shipSize; i++) {
			shipCoords.push([position[0] + i, position[1]]);
		}
	} else {
		for (let i = 0; i < shipSize; i++) {
			shipCoords.push([position[0], position[1] + i]);
		}
	}
	console.log(shipCoords);

	const isValid = shipCoords.every((coord) => {
		return !checkHit({ hit: coord, ships });
	});
	if (!isValid) return -1;

	const shipX = "";
	const shipY = "";

	shipCoords.forEach((coord) => {
		shipX.concat(coord[0]);
		shipY.concat(coord[1]);
	});

	const docSnap = await getDoc(doc(db, "Game", gameId));
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (data.players[0] === user.uid) {
			await updateDoc(doc(db, "Game", gameId), {
				ship1X: shipX,
				ship1Y: shipY,
			});
			return 1;
		} else if (data.players[1] === user.uid) {
			await updateDoc(doc(db, "Game", gameId), {
				ship2X: shipX,
				ship2Y: shipY,
			});
			return 1;
		}
	}

	return -1;
};
//#endregion

//#region gameplay
const checkTurn = async ({ user, gameId }) => {
	let playerNum = -1,
		isCurrent = false;
	const docSnap = await getDoc(doc(db, "Game", gameId));
	if (docSnap.exists()) {
		const data = docSnap.data();
		playerNum =
			data.players[0] === user.uid
				? 0
				: data.players[1] === user.uid
				? 1
				: -1;
		isCurrent = data.players[data.currentPlayer] === user.uid;
	}
	return { playerNum, isCurrent };
};

const attack = async ({ user, gameId, position }) => {
	const { playerNum, isCurrent } = checkTurn({ user, gameId });
	if (!isCurrent || playerNum === -1) return -1;

	const ships = getShips({ gameId, playerNum: playerNum === 0 ? 1 : 0 });
	const isHit = checkHit({ hit: position, ships });

	if (playerNum === 0) {
		await updateDoc(doc(db, "Game", gameId), {
			turn: increment(1),
			currentPlayer: isHit ? 0 : 1,
			lastMove: serverTimestamp(),

			lives2: increment(-1),
			visible2X: arrayUnion(position[0]),
			visible2Y: arrayUnion(position[1]),
		});
	} else if (playerNum === 1) {
		await updateDoc(doc(db, "Game", gameId), {
			turn: increment(1),
			currentPlayer: isHit ? 1 : 0,
			lastMove: serverTimestamp(),

			lives1: increment(-1),
			visible1X: arrayUnion(position[0]),
			visible1Y: arrayUnion(position[1]),
		});
	}
};

const view = async ({ gameId, playerNum }) => {
	const docSnap = await getDoc(doc(db, "Game", gameId));
	const hit = [],
		miss = [];
	if (docSnap.exists()) {
		const data = docSnap.data();
		if (playerNum === 0) {
			const ships = getShips({ gameId, playerNum });
			for (let i = 0; i < data.viewable1X.length; i++) {
				if (
					checkHit({
						hit: [data.visible1X[i], data.visible1Y[i]],
						ships,
					})
				) {
					hit.push([data.visible1X[i], data.visible1Y[i]]);
				} else {
					miss.push([data.visible1X[i], data.visible1Y[i]]);
				}
			}
		} else if (playerNum === 1) {
			const ships = getShips({ gameId, playerNum });
			for (let i = 0; i < data.viewable2X.length; i++) {
				if (
					checkHit({
						hit: [data.visible2X[i], data.visible2Y[i]],
						ships,
					})
				) {
					hit.push([data.visible2X[i], data.visible2Y[i]]);
				} else {
					miss.push([data.visible2X[i], data.visible2Y[i]]);
				}
			}
		}
	}
	return { hit, miss };
};
//#endregion

const sendMessage = async ({ user, message }) => {
	// const matches = obscenityMatcher.getAllMatches(message);
};

//#region admin
// const delOldGames = async () => {
// 	const yesterday = new Date();
// 	yesterday.setDate(yesterday.getDate() - 1);
// 	const gameQuery = query(
// 		collection(db, "Game"),
// 		where("timeStarted", "<", yesterday)
// 	);
// 	const snap = await getDocs(gameQuery);
// 	snap.forEach((gameDoc) => {
// 		deleteDoc(doc(db, "Game", gameDoc.id));
// 	});
// };

//#endregion

export {
	auth,
	db,
	SHIP_TYPES,
	initializeUser,
	changeUserName,
	newGame,
	joinGame,
	leaveGame,
	getShips,
	placeShip,
	checkTurn,
	attack,
	view,
	sendMessage,
	//delOldGames,
};
