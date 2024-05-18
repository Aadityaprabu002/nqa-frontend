import apiService from "./apiService";

export const similarQuestionService = (question) => {
  const data = {
    question: question,
  };
  const response = apiService.post("similar_questions", data);
  return response;
};
export const similarQuestionAnswerService = (questionId) => {
  const data = {
    questionId: questionId,
  };
  const response = apiService.post("similar_answer", data);
  return response;
};
