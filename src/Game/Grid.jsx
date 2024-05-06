import React, { useState, useCallback } from "react";
import styles from "./Grid.module.css";
import Cell from "./Cell";

const Grid = ({ handleGridClick }) => {
	const xHeader = useCallback(() => {
		const headers = [];
		for (let i = 0; i < 10; i++) {
			headers.push(
				<th scope="col" key={`col${i}`}>
					{i + 1}
				</th>
			);
		}

		return (
			<thead>
				<tr className={styles.coordNums}>
					<th className={styles.emptycell} key={`colOrigin`}></th>
					{headers}
				</tr>
			</thead>
		);
	}, []);

	const buildRow = useCallback(
		(rowI) => {
			const row = [];

			for (let i = 0; i < 10; i++) {
				row.push(
					<td key={`row${rowI}`}>
						<Cell handleGridClick={handleGridClick(rowI, i)} />
					</td>
				);
			}

			return (
				<tr className={styles.coordNums}>
					<th scope="row" key={`rowOrigin`}>
						{String.fromCharCode(65 + rowI)}
					</th>
					{row}
				</tr>
			);
		},
		[handleGridClick]
	);

	const buildBody = useCallback(() => {
		const rows = [];
		for (let i = 0; i < 10; i++) {
			rows.push(buildRow(i));
		}

		return <tbody className={styles.gCells}>{rows}</tbody>;
	}, [buildRow]);

	return (
		<div className={styles.battlefield}>
			<table>
				{xHeader()}
				{buildBody()}
			</table>
		</div>
	);

	const [gridData, setGridData] = useState(
		Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0))
	);

	const updateGrid = (row, col) => {
		const newGridData = [...gridData];
		newGridData[row][col] = newGridData[row][col] === 0 ? 1 : 0;
		setGridData(newGridData);
	};

	return (
		<div className={styles.battlefield}>
			<table>
				<tbody>
					<tr>
						<th className={styles.emptycell}></th>
						{Array.from({ length: 10 }, (_, index) => (
							<th className={styles.coordNums} key={index}>
								{index + 1}
							</th>
						))}
					</tr>
					{gridData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<th className={styles.coordLetters}>
								{String.fromCharCode(65 + rowIndex)}
							</th>
							{row.map((cell, colIndex) => (
								<td key={colIndex} className={styles.gCells}>
									<Cell
										// key={colIndex}
										className={`${styles.cell} ${
											colIndex === 0
												? styles.firstColumn
												: ""
										}`}
										onClick={() =>
											updateGrid(rowIndex, colIndex)
										}
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
