import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

import {
	TextCensor,
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";

const obscenityMatcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});
const xStrategy = (ctx) => "X".repeat(ctx.matchLength);
const censor = new TextCensor().setStrategy(xStrategy);

export const ReactFireStoreContext = React.createContext();

const auth = getAuth();

export default function ReactFireStoreProvider(props) {
	const {
		status,
		data: { displayName, uid },
	} = useUser();
	const UserCollection = useFirestore().collection("User");
	const User = useFirestoreCollectionData(UserCollection);
	const GameCollection = useFirestore().collection("Game");
	const Game = useFirestoreCollectionData(GameCollection);
	const ChatCollection = useFirestore().collection("Chat");
	const Chat = useFirestoreCollectionData(ChatCollection);

	const changeUserName = async (name) => {
		const matches = obscenityMatcher.getAllMatches(name);
		const censored = censor.applyTo(name, matches);
		console.log(censored);

		await updateProfile(auth.currentUser, {
			displayName: name,
		});
	};
	const joinGame = async () => {};
	const newGame = async () => {};
	const resign = async () => {};
	const placeShip = async () => {};
	const attack = async () => {};
	const view = async () => {};
	const sendMessage = async () => {};

	return (
		<ReactFireStoreContext.Provider
			value={{
				displayName,
				uid,
				changeUserName,
				joinGame,
				newGame,
				resign,
				placeShip,
				attack,
				view,
				sendMessage,
			}}
		>
			{props.children}
		</ReactFireStoreContext.Provider>
	);
}
