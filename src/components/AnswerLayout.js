import React, { useState } from "react";
import styles from "../styles/answerLayoutStyles";
import {
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import useFeedback from "../hooks/useFeedback";
import { green } from "@mui/material/colors";

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
  console.log(answer["canFeedback"]);
  return (
    <div className={classes.answerContainer}>
      <div className={classes.container}>
        <div style={{ textAlign: "justify" }}>
          <Typography variant="h2" style={{ textAlign: "center" }}>
            Article {currentIndex + 1} out of {relevantArticles.length}{" "}
          </Typography>
          <br></br>
          <Typography variant="h4">
            {" "}
            The answer extracted from this article is "
            <Typography variant="h4" component={"span"} color={green[600]}>
              {relevantArticles[currentIndex].extractedSentence}
            </Typography>
            {' " '}
            with a confidence score of{" "}
            <Typography variant="h4" component={"span"} color={green[600]}>
              {Math.round(
                parseFloat(
                  relevantArticles[currentIndex].extractedAnswer.score * 100
                )
              )}{" "}
              %
            </Typography>
          </Typography>
          <br></br>
          <Typography variant="h6">
            <Typography variant="h6" color={green[600]}>
              Extracted Title:
            </Typography>
            {relevantArticles[currentIndex].title}
          </Typography>
          <br></br>
          <Typography variant="h6">
            <Typography variant="h6" color={green[600]}>
              Extracted Body:
            </Typography>
            {relevantArticles[currentIndex].body}
          </Typography>
          <br></br>
          <Typography variant="h6">
            <Typography variant="h6" color={green[600]}>
              Extracted Author:
            </Typography>
            {relevantArticles[currentIndex].author}
          </Typography>
          <br></br>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h3">Image</Typography>
            <Base64Image base64String={relevantArticles[currentIndex].image} />
          </div>
        </div>
        <div className={classes.navigator}>
          <Button variant="contained" color="secondary" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="contained" color="secondary" onClick={handleNext}>
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
                label={
                  <Typography variant="h4" color={green[600]}>
                    Relevant
                  </Typography>
                }
              />
              <FormControlLabel
                value="irrelevant"
                control={<Radio />}
                label={<Typography variant="h4">Irrelevant</Typography>}
              />
            </RadioGroup>
          </div>
        )}
        {hasSubmitted && (
          <Typography variant="h4" color={green[600]}>
            Relevance score submitted!
          </Typography>
        )}
        <br></br>
        {!hasSubmitted && canFeedback && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitFeedback}
          >
            Submit Relevance Score
          </Button>
        )}
        <br></br>
        {feedbackSubmissionLoading && <CircularProgress />}
        <br></br>
      </div>
    </div>
  );
};

export default AnswerLayout;
