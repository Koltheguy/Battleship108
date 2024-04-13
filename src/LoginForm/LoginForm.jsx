import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import styles from './LoginForm.module.css';

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
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={`${styles.text} ${styles.textLarge}`}>Login</h1>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={`${styles.label} ${styles.hidden}`}>Email:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleUsernameChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={`${styles.label} ${styles.hidden}`}>Password:</label>
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
                    <button type="submit" name="signup" className={`${styles.button} ${styles.linkButton}`}>
                        Sign up
                    </button>
                    <button type="submit" name="login" className={styles.button}>
                        Login
                    </button>
                </div>
                <div  className={styles.striped}>
                    <span className={styles.stripedLine}></span>
                    <span className={styles.stripedText}>Or</span>
                    <span className={styles.stripedLine}></span>
                </div>
                <button onClick={googleAuthPopup} className={`${styles.button} ${styles.googleButton}`}>
                    <FontAwesomeIcon icon={faGoogle} style={{ color: "#DB4437", marginRight: "10px" }} />
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};

export default LoginForm;