import React from "react";
import styles from "./ResignButton.module.css";

const ResignButton = ({ onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        left: "1300px",
        bottom: "-390px",
        width: "386px",
        height: "190px",
        fontSize: "80px",
        backgroundColor: "#1eb980",
      }}
    >
      Forfeit
    </button>
  );
};

export default ResignButton;
