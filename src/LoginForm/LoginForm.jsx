import React, { useState } from "react";
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const obscenityMatcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

const LoginForm = () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const buttonType = event.nativeEvent.submitter.name;
		if (email && password) {
			if (obscenityMatcher.hasMatch(email)) {
				alert(
					`Sorry, your email is considered profane by a filter, please use a different email.\n` +
						`Word(s) found: ${obscenityMatcher
							.getAllMatches(email)
							.map(
								(match) =>
									englishDataset.getPayloadWithPhraseMetadata(
										match
									).phraseMetadata.originalWord
							)
							.join(" , ")}`
				);
			}
			if (buttonType === "login")
				signInWithEmailAndPassword(auth, email, password);
			else if (buttonType === "signup")
				createUserWithEmailAndPassword(auth, email, password);
		} else {
			alert("Username and password are required!");
		}
	};

	const googleAuthPopup = () => {
		signInWithPopup(auth, provider);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit" name="login">
					Login
				</button>
				<button type="submit" name="signup">
					Sign up
				</button>
			</form>
			<button onClick={googleAuthPopup}>Sign in with Google</button>
		</div>
	);
};

export default LoginForm;
