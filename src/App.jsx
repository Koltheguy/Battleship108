import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Lobby from "./Lobby/Lobby";
import { useSigninCheck, useUser } from "reactfire";

export default function App() {
	const { status, data: signInCheckResult } = useSigninCheck();
	const { data: user } = useUser();
	console.log(user);

	if (status === "loading") return <span>loading...</span>;

	if (signInCheckResult.signedIn === true) {
		return (
			<>
				Welcome {user.email}
				<Lobby />
			</>
		);
	} else {
		return <LoginForm />;
	}
}
