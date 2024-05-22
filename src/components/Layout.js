import React, { useState } from "react";
import styles from "../styles/layoutStyles";
import QuestionAnswering from "./QuestionAnswering";
import NewspaperAnalytics from "./NewspaperAnalytics";
import Header from "./Header";
function Layout() {
  const [analyticsProcessing, setAnalyticsProcessing] = useState(false);
  const [analyticsProcessed, setAnalyticsProcessed] = useState(true);
  const handleAnalyticsProcessing = (value) => {
    setAnalyticsProcessing(value);
    setAnalyticsProcessed(!value);
  };
  const classes = styles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.layoutContainer}>
        <div className={classes.leftDivision}>
          {
            <NewspaperAnalytics
              analyticsProcessing={analyticsProcessing}
              analyticsProcessed={analyticsProcessed}
            />
          }
        </div>
        <div className={classes.rightDivision}>
          {
            <QuestionAnswering
              handleAnalyticsProcessing={handleAnalyticsProcessing}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default Layout;
