import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Lobby from "./Lobby/Lobby";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import "./dark-theme.css";

export default function App() {
	const [user] = useAuthState(auth);
	if (user) {
		return <Lobby />;
	} else {
		return <LoginForm />;
	}
}
