import React, { useState } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from "./LoginForm.module.css";

const obscenityMatcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

const LoginForm = () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const buttonType = event.nativeEvent.submitter.name;
		if (buttonType === "googleAuth") return;
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
				return;
			} else if (buttonType === "login")
				await signInWithEmailAndPassword(auth, email, password);
			else if (buttonType === "signup")
				await createUserWithEmailAndPassword(auth, email, password);
		} else {
			alert("Username and password are required!");
		}
	};

	const googleAuthPopup = async () => {
		await signInWithPopup(auth, provider);
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h1 className={`${styles.text} ${styles.textLarge}`}>Login</h1>
				<div className={styles.inputGroup}>
					<label
						htmlFor="email"
						className={`${styles.label} ${styles.hidden}`}
					>
						Email:
					</label>
					<input
						type="text"
						id="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						className={styles.input}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label
						htmlFor="password"
						className={`${styles.label} ${styles.hidden}`}
					>
						Password:
					</label>
					<input
						type="password"
						id="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
						className={styles.input}
					/>
				</div>
				<div className={styles.buttonContainer}>
					<button
						type="submit"
						name="signup"
						className={`${styles.button} ${styles.linkButton}`}
					>
						Sign up
					</button>
					<button
						type="submit"
						name="login"
						className={styles.button}
					>
						Login
					</button>
				</div>
				<div className={styles.striped}>
					<span className={styles.stripedLine}></span>
					<span className={styles.stripedText}>Or</span>
					<span className={styles.stripedLine}></span>
				</div>
				<button
					name="googleAuth"
					onClick={googleAuthPopup}
					className={`${styles.button} ${styles.googleButton}`}
				>
					<FontAwesomeIcon
						icon={faGoogle}
						style={{ color: "#DB4437", marginRight: "10px" }}
					/>
					Sign in with Google
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
