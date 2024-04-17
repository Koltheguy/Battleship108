import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Lobby from "./Lobby/Lobby";
import ReactFireProvider from "./ReactFireProvider";
import { useSigninCheck } from "reactfire";

export default function App() {
	const { status, data: signInCheckResult } = useSigninCheck();

	if (status === "loading") return <span>loading...</span>;

	if (signInCheckResult.signedIn === true) {
		return (
			<ReactFireProvider>
				<Lobby />
			</ReactFireProvider>
		);
	} else {
		return <LoginForm />;
	}
}
