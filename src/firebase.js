import firebase from "firebase/compat/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const firestore = getFirestore(app);

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

	if (!cleanedName || cleanedName.length < 3) {
		cleanedName = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
			separator: "",
			style: "capital",
			seed: Date.now(),
		});
	}
	console.log("change", cleanedName);

	await updateProfile(auth.currentUser, {
		displayName: cleanedName,
	}).then(() => cleanedName);
};

const joinGame = async () => {};
const newGame = async () => {};
const resign = async () => {};
const placeShip = async () => {};
const attack = async () => {};
const view = async () => {};
const sendMessage = async () => {};

export {
	auth,
	firestore,
	changeUserName,
	joinGame,
	newGame,
	resign,
	placeShip,
	attack,
	view,
	sendMessage,
};
