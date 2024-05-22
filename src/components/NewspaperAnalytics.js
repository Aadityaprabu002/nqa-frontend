import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/newspaperAnalyticsStyles";
import AnalyticsLayout from "./AnalyticsLayout";
import useNewspaperAnalytics from "../hooks/useNewspaperAnalytics";
import Message from "./Message";
function NewspaperAnalytics({ analyticsProcessing, analyticsProcessed }) {
  const classes = styles();
  // eslint-disable-next-line
  const { loadAnalytics, analyticsLoading } = useNewspaperAnalytics();
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSetMessage = (message, isError = false) => {
    setMessage(message);
    setIsError(isError);
  };
  const handleLoadAnalytics = async () => {
    setAnalytics({});
    setViewAnalytics(false);
    const result = await loadAnalytics();
    if (result.error) {
      handleSetMessage(result.error, true);
      return;
    }
    setAnalytics(result);
    setViewAnalytics(true);
  };
  return (
    <div className={classes.container}>
      <Typography variant="h2">Analytics</Typography>
      <Message message={message} isError={isError} />
      {analyticsProcessing && <CircularProgress />}

      {analyticsProcessed && (
        <Button variant="contained" onClick={handleLoadAnalytics}>
          View
        </Button>
      )}
      {viewAnalytics && <AnalyticsLayout analytics={analytics} />}
    </div>
  );
}

export default NewspaperAnalytics;
