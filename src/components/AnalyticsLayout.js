import React, { useState } from "react";
import styles from "../styles/analyticsLayoutStyles";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
function AnalyticsLayout({ analytics, handleSetMessage }) {
  // eslint-disable-next-line
  const [analyticsData, setAnalyticsData] = useState(analytics);
  const classes = styles();
  if (Object.keys(analyticsData).length === 0) {
    handleSetMessage("No analytics data found", true);
    return;
  }
  if (analyticsData.error) {
    handleSetMessage(analyticsData.error, true);
    return;
  }
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Number of Newspaper is{" "}
        <Typography variant="h4" component={"span"} color={green[600]}>
          {analyticsData.newspaperCount}
        </Typography>
      </Typography>
      <Typography variant="h4">
        Number of Articles is {""}
        <Typography variant="h4" component={"span"} color={green[600]}>
          {analyticsData.articleCount}
        </Typography>
      </Typography>
      {/* <Typography variant="h4">
        Number of Ads is {analyticsData.adCount}
      </Typography> */}
      {Object.entries(analyticsData.articleCategory).map(([key, value]) => {
        return (
          <Typography variant="h4">
            Number of Articles in{" "}
            <Typography variant="h4" component={"span"} color={green[600]}>
              {key}
            </Typography>{" "}
            is{" "}
            <Typography variant="h4" component={"span"} color={green[600]}>
              {value}
            </Typography>
          </Typography>
        );
      })}
    </div>
  );
}

export default AnalyticsLayout;
