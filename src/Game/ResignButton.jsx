import React from "react";
import style from "./ResignButton.module.css";
import Button from "@mui/material/Button";

const ResignButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Resign
    </Button>
  );
};

export default ResignButton;
