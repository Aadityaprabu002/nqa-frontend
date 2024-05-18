import { Button } from "@mui/material";
import React, { useState } from "react";

function SimilarQuestionLayout({
  similarQuestions,
  handleClickOnSimilarQuestion,
  handleSetMessage,
  handleAskQuestion,
}) {
  // eslint-disable-next-line
  const [similarQuestionsList, setSimilarQuestionsList] =
    useState(similarQuestions);
  return (
    <div className="question-block">
      {similarQuestionsList.length === 0 &&
        handleSetMessage("No similar questions found", true)}
      {similarQuestionsList.map((data, index) => (
        <div
          style={{ border: "black 1px solid " }}
          key={index}
          onClick={() => handleClickOnSimilarQuestion(data.questionId)}
        >
          <h2>Similar Question : {data.similarQuestion}</h2>
          <h2>Related Article Count : {data.relatedArticlesCount}</h2>
        </div>
      ))}
      <Button variant="contained" onClick={handleAskQuestion}>
        Click here to search in database!
      </Button>
    </div>
  );
}

export default SimilarQuestionLayout;
