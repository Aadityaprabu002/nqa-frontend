import apiService from "./apiService";

const feedbackService = async (
  relevancyList,
  relevantArticleIdList,
  question
) => {
  for (let i = 0; i < relevancyList.length; i++) {
    switch (relevancyList[i]) {
      case "relevant":
        relevancyList[i] = 1;
        break;
      default:
        relevancyList[i] = 0;
    }
  }
  const data = {
    relevancy_list: relevancyList,
    article_id_list: relevantArticleIdList,
    question: question,
  };
  const response = apiService.post("feedback", data);
  return response;
};

export default feedbackService;
