import React, { useState } from "react";
import { sha256 } from "crypto-hash";

const generateSalt = (length) => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let salt = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		salt += characters.charAt(randomIndex);
	}
	return salt;
};

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const salt = generateSalt(15);
		const hashedPassword = await sha256(password + salt);
		if (username && password) {
			setLoggedIn(true);
			alert(`password hash ${hashedPassword}`);
		} else {
			alert("Username and password are required!");
		}
	};

	return (
		<div>
			{loggedIn ? (
				<h1>Welcome, {username}!</h1>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							value={username}
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
					<button type="submit">Login</button>
				</form>
			)}
		</div>
	);
};

export default LoginForm;
