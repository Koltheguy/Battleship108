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
					<th className={styles.emptyCell} key={`colOrigin`}></th>
					{headers}
				</tr>
			</thead>
		);
	}, []);

	const buildRow = useCallback(
		(rowI) => {
			const row = [];

			for (let i = 0; i < 10; i++) {
				const cellClick = () => {
					handleGridClick([i, rowI]);
				};
				row.push(
					<Cell
						key={`${i}${rowI}`}
						tdKey={`${i}${rowI}`}
						handleClick={cellClick}
					/>
				);
			}

			return (
				<tr className={styles.coordNums} key={`row${rowI}`}>
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
		<div className={styles.grid}>
			<table>
				{xHeader()}
				{buildBody()}
			</table>
		</div>
	);
};

export default Grid;
