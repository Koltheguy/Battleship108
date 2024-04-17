import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Lobby from "./Lobby/Lobby";
import { useSigninCheck } from "reactfire";
import ReactFireProvider from "./ReactFireProvider";

export default function App() {
	const { status, data: signInCheckResult } = useSigninCheck();

	console.log(status);

	if (status === "loading") return <span>loading...</span>;

	console.log(signInCheckResult);

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
