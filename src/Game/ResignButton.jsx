import React, { useEffect, useState } from "react";
import styles from "./ResignButton.module.css";
import { leaveGame, joinGame } from "../firebase";

const ResignButton = ({ user, gameId }) => {
  const [isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    const checkIsPlayer = async () => {
      const isPlayerResult = await joinGame({ user, gameId, isPlayer});
      setIsPlayer(isPlayerResult);
    };

    checkIsPlayer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, gameId]);

  const handleResign = async () => {
    await leaveGame({ user, gameId, isPlayer });
  };

  return (
    <button className={styles.button} onClick={handleResign}>
      {isPlayer ? "Forfeit" : "Leave"}
    </button>
  );
};

export default ResignButton;
