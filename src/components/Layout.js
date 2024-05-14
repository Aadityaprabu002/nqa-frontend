import React from "react";
import styles from "../styles/layoutStyles";
import QuestionAnswering from "./QuestionAnswering";
import NewspaperAnalytics from "./NewspaperAnalytics";
function Layout() {
  const classes = styles();
  return (
    <div className={classes.layoutContainer}>
      <div className={classes.leftDivision}>{<NewspaperAnalytics />}</div>
      <div className={classes.rightDivision}>{<QuestionAnswering />}</div>
    </div>
  );
}

export default Layout;
