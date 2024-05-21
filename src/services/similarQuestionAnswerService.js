import apiService from "./apiService";

export const similarQuestionService = (question) => {
  const data = {
    question: question,
  };
  const response = apiService.post("similar_question", data);
  return response;
};
export const similarQuestionAnswerService = (question, questionId) => {
  const data = {
    questionId: questionId,
    question: question,
  };
  const response = apiService.post("similar_answer", data);
  return response;
};
