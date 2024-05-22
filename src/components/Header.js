import { Typography } from "@mui/material";
import styles from "../styles/headerStyles";
import React from "react";
const Header = () => {
  const classes = styles();
  return (
    <div className={classes.header}>
      <Typography variant="h1">Newspaper Question Answering</Typography>
    </div>
  );
};
export default Header;
