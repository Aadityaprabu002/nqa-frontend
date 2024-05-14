import { useState } from "react";
import questionAnsweringService from "../services/questionAnsweringService";
const useQuestionAnswering = () => {
  const [answerLoading, setAnswerLoading] = useState(false);
  const askQuestion = async (question) => {
    setAnswerLoading(true);
    let answer;
    try {
      answer = await questionAnsweringService(question);
    } catch (error) {
      answer = {
        message: "Error asking question. Please try again.",
      };
    }

    setAnswerLoading(false);
    return answer;
  };

  return { askQuestion, answerLoading };
};

export default useQuestionAnswering;
