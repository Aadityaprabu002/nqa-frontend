import { Typography, setRef } from "@mui/material";
import React from "react";
import styles from "../styles/newspaperAnalyticsStyles";
function NewspaperAnalytics() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="h2">Analytics</Typography>
    </div>
  );
}

export default NewspaperAnalytics;
