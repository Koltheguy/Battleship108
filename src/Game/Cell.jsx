import React, { useState } from "react";
import styles from "./Cell.module.css";

const Cell = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div
      className={`${styles.cell} ${clicked ? styles.clicked : ''}`}
      onClick={handleClick}
    ></div>
  );
};

export default Cell;
