import { useState } from "react";
import newspaperAnalyticsService from "../services/newspaperAnalyticsService";
const useNewspaperAnalytics = () => {
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    let analytics;
    try {
      analytics = await newspaperAnalyticsService();
    } catch (error) {
      analytics = {
        error: "Error fetching analytics. Please try again.",
      };
    }
    setAnalyticsLoading(false);
    return analytics;
  };
  return { loadAnalytics, analyticsLoading };
};

export default useNewspaperAnalytics;
