import { Button, Typography } from "@mui/material";
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
          onClick={() =>
            handleClickOnSimilarQuestion(data.similarQuestion, data.questionId)
          }
        >
          <h2>Similar Question : {data.similarQuestion}</h2>
          <h2>Related Article Count : {data.relatedArticlesCount}</h2>
        </div>
      ))}
      <div>
        <Typography variant="subtitle1">
          Not finding any results then proceed to search in database
        </Typography>
        <Button variant="contained" onClick={handleAskQuestion}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SimilarQuestionLayout;
