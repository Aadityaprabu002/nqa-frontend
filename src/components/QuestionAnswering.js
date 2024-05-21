import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../styles/questionAnsweringStyles";
import NewspaperProcessing from "./NewspaperProcessing";
import useQuestionAnswering from "../hooks/useQuestionAnswering";
import AnswerLayout from "./AnswerLayout";
import Message from "./Message";
import SimilarQuestionLayout from "./SimilarQuestionLayout";
import useSimilarQuestionAnswering from "../hooks/useSimilarQuestionAnswering";
function QuestionAnswering() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [question, setQuestion] = useState("");
  const [useDatabase, setUseDatabase] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [answerLoaded, setAnswerLoaded] = useState(false);
  const [answer, setAnswer] = useState({});
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [similarQuestionsLoaded, setSimilarQuestionsLoaded] = useState(false);
  const [similarQuestionAnswerLoaded, setSimilarQuestionAnswerLoaded] =
    useState(false);
  const { askQuestion, answerLoading } = useQuestionAnswering();
  // eslint-disable-next-line
  const {
    askSimilarQuestion,
    fetchArticlesAndAnswersRelatedToQuestionId,
    similarQuestionLoading,
    similarQuestionAnswerLoading,
  } = useSimilarQuestionAnswering();

  const classes = styles();

  const handleUseDatabase = (value) => {
    setUseDatabase(value);
    handleHasProcessed(value);
    handleSetMessage("");
  };
  const handleHasProcessed = (value) => {
    setHasProcessed(value);
  };
  const handleSetMessage = (message, isError = false) => {
    setMessage(message);
    setIsError(isError);
  };
  const handleClickOnSimilarQuestion = async (question, questionId) => {
    setAnswer({});
    setSimilarQuestionAnswerLoaded(false);
    handleSetMessage("");
    const result = await fetchArticlesAndAnswersRelatedToQuestionId(
      question,
      questionId
    );
    if (result.error) {
      handleSetMessage(result.message, true);
    } else {
      setAnswer(result);
      setSimilarQuestionAnswerLoaded(true);
    }
  };
  const handleAskSimilarQuestion = async () => {
    setAnswer({});
    setSimilarQuestions([]);
    setSimilarQuestionsLoaded(false);
    setAnswerLoaded(false);
    handleSetMessage("");
    if (!question || question === "") {
      handleSetMessage("Please enter a question", true);
      return;
    }
    const result = await askSimilarQuestion(question);
    if (result.error) {
      handleSetMessage(result.message, true);
    } else {
      setSimilarQuestions(result);
      setSimilarQuestionsLoaded(true);
    }
  };
  const handleAskQuestion = async () => {
    setAnswer({});
    setSimilarQuestions([]);
    setSimilarQuestionsLoaded(false);
    setAnswerLoaded(false);
    handleSetMessage("");
    if (!question || question === "") {
      handleSetMessage("Please enter a question", true);
      return;
    }
    const result = await askQuestion(question);
    console.log(result);
    if (result.error) {
      handleSetMessage(result.message, true);
    } else {
      setAnswer(result);
      setAnswerLoaded(true);
    }
  };
  const handleSetQuestion = (value) => {
    setQuestion(value);
    setAnswerLoaded(false);
  };
  return (
    <div className={classes.container}>
      <Typography variant="h2">Query</Typography>

      <Box>
        <label>Use database</label>

        <Checkbox
          checked={useDatabase}
          onChange={(e) => handleUseDatabase(e.target.checked)}
          color="primary"
        />
      </Box>
      {!useDatabase && (
        <NewspaperProcessing
          handleHasProcessed={handleHasProcessed}
          handleSetMessage={handleSetMessage}
          hasProcessed={hasProcessed}
        />
      )}

      {hasProcessed && (
        <div
          style={{
            display: "flex",
            width: "50vh",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            value={question}
            onChange={(e) => handleSetQuestion(e.target.value)}
            placeholder="Ask something from the newspaper article"
            style={{ marginRight: "10px", marginBottom: "0" }}
          />
          <div className={classes.askButton}>
            <Button
              variant="contained"
              onClick={() => {
                handleAskSimilarQuestion();
              }}
              style={{ marginBottom: "0" }}
            >
              Ask
            </Button>
          </div>
        </div>
      )}

      <Message message={message} isError={isError} />
      {similarQuestionLoading && <CircularProgress />}
      {similarQuestionsLoaded && (
        <SimilarQuestionLayout
          similarQuestions={similarQuestions}
          handleSetMessage={handleSetMessage}
          handleClickOnSimilarQuestion={handleClickOnSimilarQuestion}
          handleAskQuestion={handleAskQuestion}
        />
      )}

      {(answerLoading || similarQuestionAnswerLoading) && <CircularProgress />}

      {(answerLoaded || similarQuestionAnswerLoaded) && (
        <AnswerLayout
          question={question}
          answer={answer}
          handleSetMessage={handleSetMessage}
        />
      )}
    </div>
  );
}

export default QuestionAnswering;
