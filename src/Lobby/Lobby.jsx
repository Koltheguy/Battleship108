import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styles from "./Lobby.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Lobby = () => {
    const auth = getAuth();
    const handleSignout = (event) => {
        signOut(auth);
    };

    // Example data for the table
    const tableData = [
        { game: 1, name: "Alice", status: "Waiting for players" },
        { game: 2, name: "Bob", status: "In Progress" },
        { game: 3, name: "Charlie", status: "Waiting for players" }
    ];

    return (
        <div>
            <h1>Battleship</h1>
            <button className={`${styles.pureMaterial} ${styles.newGame}`}>New Game</button>
            <button className={`${styles.pureMaterial} ${styles.signOut}`} onClick={handleSignout}>Sign out</button>
            {/* <h2>Games</h2> */}
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Created by</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.game}</td>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                            <td><button className={`${styles.pureMaterial} ${styles.join}`}>Join</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Lobby;