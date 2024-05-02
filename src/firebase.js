import firebase from "firebase/compat/app";
import { getAuth, updateProfile } from "firebase/auth";
import {
	getFirestore,
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

// const GRID_SIZE = 10;
// const SHIP_TYPES = {
// 	carrier: 5,
// 	battleship: 4,
// 	cruiser: 3,
// 	destroyer: 3,
// 	frigate: 2,
// 	corvette: 2,
// };

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

const changeUserName = async (name) => {
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

	await updateProfile(auth.currentUser, {
		displayName: cleanedName,
	}).then(() => cleanedName);
};

const initializeUser = async (user) => {
	const snap = await getCountFromServer(
		query(collection(db, "User"), where(documentId(), "==", user.uid))
	);

	if (!snap.data().count)
		setDoc(doc(db, "User", user.uid), {
			wins: 0,
			loses: 0,
			gamesPlayed: 0,
			currentGame: "",
			isChatBanned: false,
		});
};

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
		timer: timer,
		players: [user.uid],
		spectate: [],
		gameState: 0,
		turn: 0,
		currentPlayer: 0,
		timeStarted: serverTimestamp(),
		winner: "",
		visibleX: [],
		visibleY: [],
		shipsX: [],
		shipsY: [],
	});

	const gameId = docRef.id;
	setDoc(doc(db, "User", user.uid), {
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

const placeShip = async ({ user, shipType, position, orientation }) => {};
const attack = async (user) => {};
const view = async (user) => {};
const sendMessage = async ({ user, message }) => {
	// const matches = obscenityMatcher.getAllMatches(message);
};

export {
	auth,
	db,
	initializeUser,
	changeUserName,
	newGame,
	joinGame,
	leaveGame,
	placeShip,
	attack,
	view,
	sendMessage,
};
