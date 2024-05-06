import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ tdKey, handleClick, className }) => {
	if (!className) className = "";

	return (
		<td
			key={tdKey}
			className={`${styles.cell} ${styles[className]}`}
			onClick={handleClick}
		></td>
	);
};

export default Cell;
