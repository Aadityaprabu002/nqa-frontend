import apiService from "./apiService";

const newspaperAnalyticsService = () => {
  const response = apiService.get("analytics");
  return response;
};

export default newspaperAnalyticsService;
