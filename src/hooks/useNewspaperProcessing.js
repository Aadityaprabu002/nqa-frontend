import { useState } from "react";
import apiService from "../services/apiService";
const useNewspaperProcessing = (
  handleHasProcessed,
  handleSetMessage,
  handleAnalyticsProcessing
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const process = async (file) => {
    if (!file) {
      handleSetMessage("Please upload a PDF file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    handleHasProcessed(false);
    setIsProcessing(true);

    handleAnalyticsProcessing(true);
    await apiService
      .post("process", formData)
      .then((response) => {
        if ("error" in response) {
          handleSetMessage(response.error);
        } else {
          handleSetMessage(response.message);
          handleHasProcessed(true);
        }
      })
      .catch((error) => {
        handleSetMessage(
          "Error processing the PDF file. Please try again.",
          true
        );
      });
    setIsProcessing(false);
    handleAnalyticsProcessing(false);
  };
  return { process, isProcessing };
};
export default useNewspaperProcessing;
