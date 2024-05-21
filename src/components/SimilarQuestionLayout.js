import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/similarQuestionLayoutStyles";
function SimilarQuestionLayout({
  similarQuestions,
  handleClickOnSimilarQuestion,
  handleSetMessage,
  handleAskQuestion,
}) {
  const classes = styles();
  // eslint-disable-next-line
  const [similarQuestionsList, setSimilarQuestionsList] =
    useState(similarQuestions);
  return (
    <div>
      {similarQuestionsList.length === 0 &&
        handleSetMessage("No similar questions found", true)}
      <Typography variant="h4">Similar Questions</Typography>
      {similarQuestionsList.map((data, index) => (
        <div className={classes.question}>
          <Typography
            variant="h6"
            key={index}
            onClick={() =>
              handleClickOnSimilarQuestion(
                data.similarQuestion,
                data.questionId
              )
            }
          >
            " {data.similarQuestion} "
            <Typography variant="h6">
              Related article count : {data.relatedArticlesCount}
            </Typography>
          </Typography>
        </div>
      ))}
      <div className={classes.notFindResult}>
        <Typography variant="subtitle1">
          Not finding any results then proceed to search in database
        </Typography>
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAskQuestion}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default SimilarQuestionLayout;
