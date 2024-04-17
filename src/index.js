import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React from "react";
import { createRoot } from "react-dom/client";
import {
	useFirebaseApp,
	FirebaseAppProvider,
	FirestoreProvider,
	AuthProvider,
	SuspenseWithPerf,
} from "reactfire";

import App from "./App";

const firebaseConfig = {
	// client requires this to access firestore
	apiKey: "AIzaSyCYYAnZIkl31Gi3S_ApU4XC8s4QuC83Cus",
	authDomain: "battleship108-7ddfc.firebaseapp.com",
	databaseURL: "https://battleship108-7ddfc-default-rtdb.firebaseio.com",
	projectId: "battleship108-7ddfc",
	storageBucket: "battleship108-7ddfc.appspot.com",
	messagingSenderId: "463046283845",
	appId: "1:463046283845:web:298795cfee030bf480c92c",
	measurementId: "G-WB23V65S09",
};

function FirebaseWrapper() {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<SuspenseWithPerf
				fallback={<p>Loading...</p>}
				traceId={"loading-app-status"}
			>
				<FirebaseComponents />
			</SuspenseWithPerf>
		</FirebaseAppProvider>
	);
}

function FirebaseComponents({ children }) {
	const app = useFirebaseApp();
	const auth = getAuth(app);
	const db = getFirestore(app);

	return (
		<AuthProvider sdk={auth}>
			<FirestoreProvider sdk={db}>
				<App />
			</FirestoreProvider>
		</AuthProvider>
	);
}

createRoot(document.getElementById("root")).render(<FirebaseWrapper />);
