import React from "react";
import styles from "./ChatBox.module.css";

const ChatBox = () => {
  return (
    <div className={styles.chatBox}>
      <div className={styles.chatHeader}>
        <h2>Chat:</h2>
      </div>
      <div className={styles.chatBody}>
        {/* Content of the chat box */}
      </div>
    </div>
  );
};

export default ChatBox;
