import React, { useState } from "react";
import Grid from "./Grid";
import ResignButton from "./ResignButton";
import styles from "./ShipPlacement.module.css"
import { SHIP_TYPES, placeShip} from "../firebase.js";
import { db, checkTurn, leaveGame } from "../firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

const ShipPlacement = (currentUser, currentGameId, currentPlayer, isCurrent, isPlayer) => {
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [orientation, setOrientation] = useState("horizontal");
  const shipTypes = Object.keys(SHIP_TYPES);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleNextShip = () => {
    console.log("handleNextShip GOT CALLED");
    setCurrentShipIndex((prevIndex) =>
      prevIndex < shipTypes.length - 1 ? prevIndex + 1 : 0
    );
  };

  const toggleOrientation = () => {
    setOrientation((prevOrientation) =>
      prevOrientation === "horizontal" ? "vertical" : "horizontal"
    );
  };
  
  const handleCellClick = (row, col) => {
    console.log("handleCellClick GOT CALLED");
    if (selectedPosition !== null) {
      placeShip({
        user: currentUser,
        gameId: currentGameId,
        shipType: shipTypes[currentShipIndex],
        position: selectedPosition,
        orientation: orientation,
      }).then((result) => {
        if (result === 1) {
          console.log("IT WORKED")
          setSelectedPosition(null);
          handleNextShip();
        } else {
          console.error("Failed to place ship on the grid.");
        }
      });
    } else {
      setSelectedPosition([row, col]);
    }
  };

  return (
    <div>
      <h2 style = {{ color: "#1eb980"}}>Place Your Ships</h2>
      <div className={styles.shipDisplay}>
        <h3 style = {{ color: "#1eb980"}}>Ship: {shipTypes[currentShipIndex]}</h3>
        <h4 style = {{ color: "#1eb980"}}>Size: {SHIP_TYPES[shipTypes[currentShipIndex]]}</h4>
        <h5 style = {{ color: "#1eb980"}}>Orientation: {orientation}</h5>
        <button style = {{ backgroundColor: "#1eb980"}} onClick={toggleOrientation}>Toggle Orientation</button>
        <button style = {{ backgroundColor: "#1eb980"}} onClick={handleNextShip}>Next Ship</button>
      </div>
      <Grid onClick={handleCellClick} />
      <ResignButton user={currentUser} gameId={currentGameId} player={isPlayer}/>
    </div>
  );
};

export default ShipPlacement;