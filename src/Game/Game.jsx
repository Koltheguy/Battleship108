import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import {
	RegExpMatcher,
	englishDataset,
	englishRecommendedTransformers,
} from "obscenity";

import styles from "./Game.module.css";
import Grid from "./Grid";

const Game = () => {
	return <Grid></Grid>;
};

export default Game;
