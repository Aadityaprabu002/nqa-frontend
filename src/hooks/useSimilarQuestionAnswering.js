import { useState } from "react";
import {
  similarQuestionAnswerService,
  similarQuestionService,
} from "../services/similarQuestionAnswerService";
const useSimilarQuestionAnswering = () => {
  const [similarQuestionLoading, setSimilarQuestionLoading] = useState(false);
  const [similarQuestionAnswerLoading, setSimilarQuestionAnswerLoading] =
    useState(false);
  const fetchArticlesAndAnswersRelatedToQuestionId = async (
    question,
    questionId
  ) => {
    setSimilarQuestionAnswerLoading(true);
    let similarQuestionAnswer;
    try {
      similarQuestionAnswer = await similarQuestionAnswerService(
        question,
        questionId
      );
    } catch (error) {
      similarQuestionAnswer = {
        error: "Error loading similar questions. Please try again.",
      };
    }
    setSimilarQuestionAnswerLoading(false);
    return similarQuestionAnswer;
  };
  const askSimilarQuestion = async (question) => {
    setSimilarQuestionLoading(true);
    let similarQuestions;
    try {
      similarQuestions = await similarQuestionService(question);
    } catch (error) {
      similarQuestions = {
        error: "Error loading similar questions. Please try again.",
      };
    }
    setSimilarQuestionLoading(false);
    return similarQuestions;
  };
  return {
    askSimilarQuestion,
    fetchArticlesAndAnswersRelatedToQuestionId,
    similarQuestionLoading,
    similarQuestionAnswerLoading,
  };
};

export default useSimilarQuestionAnswering;
