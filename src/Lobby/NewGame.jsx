import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { newGame } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function NewGame({ user, toggleNewGamePage }) {
	// const [timer, setTimer] = useState("30s");
	// const handleTimerChange = (event) => setTimer(event.target.value);
	const [gameName, setGameName] = useState("");
	const handleGameNameChange = (event) => {
		setGameName(event.target.value.replace(/[^0-9a-zA-Z]+/gi, ""));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// newGame({ user, gameName, timer });
		newGame({ user, gameName, timer: 30 });
		toggleNewGamePage();
	};

	return (
		<div className="dark-theme">
			<Form style={{ margin: "2rem" }}>
				<h2>Create New Game</h2>
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail"
					style={{ marginTop: "2rem" }}
				>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						value={gameName}
						placeholder="Enter name of game"
						onChange={handleGameNameChange}
					/>
				</Form.Group>
				{/* <Form.Group style={{ marginTop: "2rem" }}>
					<Form.Label>Timer</Form.Label>
					<div style={{ display: "flex" }}>
						{["10s", "20s", "30s"].map((time) => (
							<Form.Check
								key={time}
								type="radio"
								id={`timer-${time}`}
								label={time}
								value={time}
								checked={timer === time}
								onChange={handleTimerChange}
								style={{ marginRight: "30px" }}
							/>
						))}
					</div>
				</Form.Group> */}
				<Button
					variant="success"
					type="submit"
					style={{ marginTop: "2rem" }}
					onClick={handleSubmit}
				>
					Create
				</Button>
			</Form>
		</div>
	);
}

export default NewGame;
