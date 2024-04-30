import React, { useState } from "react";
import styles from "./Grid.module.css";
import Cell from "./Cell"; // Import the Cell component

const Grid = () => {
	const [gridData, setGridData] = useState(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0)));
  
	const updateGrid = (row, col) => {
	  const newGridData = [...gridData];
	  newGridData[row][col] = newGridData[row][col] === 0 ? 1 : 0;
	  setGridData(newGridData);
	};
  
	return (
	  <div className={styles.grid}>
		<table>
		  <tbody>
			<tr>
			  <th className={styles.emptycell}></th>
			{Array.from({ length: 10 }, (_, index) => (
				<th className={styles.coordNums} key={index}>{index + 1}</th>
			  ))}
			</tr>
			{gridData.map((row, rowIndex) => (
			  <tr key={rowIndex}>
				<th className={styles.coordLetters}>{String.fromCharCode(65 + rowIndex)}</th>
				{row.map((cell, colIndex) => (
				  <td>
					<Cell
					key={colIndex}
					className={`${styles.cell} ${colIndex === 0 ? styles.firstColumn : ''}`}
					onClick={() => updateGrid(rowIndex, colIndex)}
				  >
					{cell}
				  </Cell>
				  </td>
				))}
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>
	);
  };
  
export default Grid;
