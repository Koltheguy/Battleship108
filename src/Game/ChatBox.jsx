import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBox.module.css";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.chatHeader}>
        <h2>Chat:</h2>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button className={styles.chatButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
