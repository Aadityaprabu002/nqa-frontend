import apiService from "./apiService";

const questionAnsweringService = (question) => {
  const data = {
    question: question,
  };
  const response = apiService.post("answer", data);
  return response;
};

export default questionAnsweringService;
