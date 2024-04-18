import React from "react";
import styles from "./UsersConnectedBox.module.css";

const UsersConnectedBox = () => {
  return (
    <div className={styles.usersBox}>
      <div className={styles.usersHeader}>
        <h2>Players in Lobby</h2>
      </div>
      <div className={styles.usersBody}>
        {/* Content of the users box */}
      </div>
    </div>
  );
};

export default UsersConnectedBox;
