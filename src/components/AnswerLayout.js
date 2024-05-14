import React, { useState } from "react";
import styles from "../styles/answerLayoutStyles";
import { Box, Button } from "@mui/material";
const Base64Image = ({ base64String }) => {
  return (
    <img
      height={640}
      width={480}
      src={`data:image/jpeg;base64,${base64String}`}
      alt="Base64 Image"
    />
  );
};

const AnswerLayout = ({ answer }) => {
  const classes = styles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relevantArticles, setRelevantArticles] = useState(answer["articles"]);
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

  const currentAnswer = relevantArticles[currentIndex];

  return (
    <div className="answer-container">
      <div className={classes.container}>
        <div className={classes.navigator}>
          <Button variant="outlined" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        </div>

        <Base64Image base64String={currentAnswer.image} />
        <p>Extracted Sentence: {currentAnswer.extractedSentence}</p>
        <pre>
          <code>{JSON.stringify(currentAnswer.extractedAnswer, null, 2)}</code>
        </pre>
        <p>Title: {currentAnswer.title}</p>
        <p>Body: {currentAnswer.body}</p>
        <p>Author: {currentAnswer.author}</p>
      </div>
    </div>
  );
};

export default AnswerLayout;
