import React, { useState } from "react";
import styles from "./ChatBox.module.css";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.chatHeader}>
        <h2>Chat:</h2>
      </div>
      <div className={styles.chatBody}>
        {}
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        {}
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        {}
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;