import React, { useState } from "react";
import styles from "./Cell.module.css";

const Cell = ({ handleClick, initClassName }) => {
	if (!initClassName) initClassName = "";
	const [className, setClassName] = useState(initClassName);

	return <div className={className} onClick={handleClick}></div>;
};

export default Cell;
