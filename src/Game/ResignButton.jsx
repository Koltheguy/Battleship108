import React from "react";
import styles from "./ResignButton.module.css";

const ResignButton = ({ onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        left: "1340px",
        bottom: "652px",
        width: "356px",
        height: "180px",
        fontSize: "80px",
        backgroundColor: "#1eb980",
      }}
    >
      Forfeit
    </button>
  );
};

export default ResignButton;
