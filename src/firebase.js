import firebase from "firebase/compat/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
} from "unique-names-generator";

import {
	TextCensor,
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";

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

const initializeUser = (user) => {
	console.log(user);
	setDoc(doc(db, "User", user.uid), {
		wins: 0,
		loses: 0,
		gamesPlayed: 0,
	});
};

const newGame = async (user) => {};
const joinGame = async (user) => {};
const resign = async (user) => {};
const placeShip = async (user) => {};
const attack = async (user) => {};
const view = async (user) => {};
const sendMessage = async (user) => {};

export {
	auth,
	db,
	initializeUser,
	changeUserName,
	joinGame,
	newGame,
	resign,
	placeShip,
	attack,
	view,
	sendMessage,
};
