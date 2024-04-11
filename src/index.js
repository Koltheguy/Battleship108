import firebase from 'firebase/compat/app';
import React from 'react';
import { createRoot } from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {  // client requires this to access firestore
	apiKey: "AIzaSyCYYAnZIkl31Gi3S_ApU4XC8s4QuC83Cus",
	authDomain: "battleship108-7ddfc.firebaseapp.com",
	databaseURL: "https://battleship108-7ddfc-default-rtdb.firebaseio.com",
	projectId: "battleship108-7ddfc",
	storageBucket: "battleship108-7ddfc.appspot.com",
	messagingSenderId: "463046283845",
	appId: "1:463046283845:web:298795cfee030bf480c92c",
	measurementId: "G-WB23V65S09"
};

function App() {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			Hello World!
		</FirebaseAppProvider>
	);
}

createRoot(document.getElementById('root')).render(<App />);