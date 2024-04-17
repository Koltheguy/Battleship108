import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";

import styles from "./Grid.module.css";
import style from "./ChatBox.module.css";
import Grid from "./Grid";
import ChatBox from "./ChatBox";

const Game = () => {
	return <div>
		<Grid />
		<ChatBox />
	</div>;
};

export default Game;
