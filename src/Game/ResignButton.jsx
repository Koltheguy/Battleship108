import React from "react";
import Button from "@mui/material/Button";

const ResignButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{
        left: "1300px",
        bottom: "190px",
        width: "386px",
        height: "190px",
        fontSize: "80px",
        backgroundColor: "blue",
        "&:hover": {
          backgroundColor: "blue",
        },
      }}
    >
      Resign
    </Button>
  );
};

export default ResignButton;