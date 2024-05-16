import { useState } from "react";
import feedbackService from "../services/feedbackService";
const useFeedback = () => {
  const [feedbackSubmissionLoading, setFeedbackSubmissionLoading] =
    useState(false);

  const submitFeedback = async (
    relevancyList,
    relevantArticleIdList,
    question
  ) => {
    setFeedbackSubmissionLoading(true);
    let response;
    try {
      response = await feedbackService(
        relevancyList,
        relevantArticleIdList,
        question
      );
    } catch (error) {
      response = {
        error: "Error submitting feedback. Please try again.",
      };
    }

    setFeedbackSubmissionLoading(false);
    return response;
  };

  return { submitFeedback, feedbackSubmissionLoading };
};

export default useFeedback;
