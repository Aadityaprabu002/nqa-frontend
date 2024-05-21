import React, { useState } from "react";
import styles from "../styles/answerLayoutStyles";
import {
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import useFeedback from "../hooks/useFeedback";

const Base64Image = ({ base64String }) => {
  return (
    // eslint-disable-next-line
    <img
      height={640}
      width={480}
      src={`data:image/jpeg;base64,${base64String}`}
    />
  );
};

const AnswerLayout = ({ question, answer, handleSetMessage }) => {
  const classes = styles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  // eslint-disable-next-line
  const [relevantArticles, setRelevantArticles] = useState(answer["articles"]);
  // eslint-disable-next-line
  const [canFeedback, setCanFeedback] = useState(answer["canFeedback"]);
  const [relevancyList, setRelevancylist] = useState(
    Array.from({ length: relevantArticles.length }, () => "")
  );
  console.log(relevantArticles);
  const { submitFeedback, feedbackSubmissionLoading } = useFeedback();
  const handleNext = () => {
    setCurrentIndex(parseInt((currentIndex + 1) % relevantArticles.length));
  };

  const handlePrev = () => {
    setCurrentIndex(
      parseInt(
        (currentIndex - 1 + relevantArticles.length) % relevantArticles.length
      )
    );
  };
  const handleRadioChange = (event) => {
    const updatedRelevancyList = [...relevancyList];
    updatedRelevancyList[currentIndex] = event.target.value;
    setRelevancylist(updatedRelevancyList);
  };

  const handleSubmitFeedback = async () => {
    const relevantArticleIdList = relevantArticles.map((article) => article.id);
    const found = relevancyList.indexOf("");
    if (found !== -1) {
      handleSetMessage(
        `Please select relevant or irrelevant for the slide: Article ${
          found + 1
        }`,
        true
      );
      return;
    }
    const response = await submitFeedback(
      relevancyList,
      relevantArticleIdList,
      question
    );
    if (response.error) {
      handleSetMessage(response.error, true);
      return;
    }
    setHasSubmitted(true);
  };
  if (relevantArticles.length === 0) {
    handleSetMessage("No articles found", true);
    return;
  }

  return (
    <div className={classes.answerContainer}>
      <div className={classes.container}>
        <div className={classes.navigator}>
          <Button variant="outlined" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        </div>
        {canFeedback && (
          <div>
            <RadioGroup
              row={true}
              className={classes.relevancyContainer}
              value={relevancyList[currentIndex]}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="relevant"
                control={<Radio />}
                label="Relevant"
              />
              <FormControlLabel
                value="irrelevant"
                control={<Radio />}
                label="Irrelevant"
              />
            </RadioGroup>
          </div>
        )}

        <h1>
          Article {currentIndex + 1} out of {relevantArticles.length}{" "}
        </h1>
        <Base64Image base64String={relevantArticles[currentIndex].image} />
        <p>
          Extracted Sentence: {relevantArticles[currentIndex].extractedSentence}
        </p>
        <pre>
          <code>
            {JSON.stringify(
              relevantArticles[currentIndex].extractedAnswer,
              null,
              2
            )}
          </code>
        </pre>
        <p>Title: {relevantArticles[currentIndex].title}</p>
        <p>Body: {relevantArticles[currentIndex].body}</p>
        <p>Author: {relevantArticles[currentIndex].author}</p>
      </div>
      {hasSubmitted && (
        <p className={classes.message}>Relevance score submitted!</p>
      )}
      {!hasSubmitted && canFeedback && (
        <Button variant="contained" onClick={handleSubmitFeedback}>
          Submit Relevance Score
        </Button>
      )}
      {feedbackSubmissionLoading && <CircularProgress />}
    </div>
  );
};

export default AnswerLayout;
