import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import styles from "../styles/questionAnsweringStyles";
import NewspaperProcessing from "./NewspaperProcessing";
import useQuestionAnswering from "../hooks/useQuestionAnswering";
import AnswerLayout from "./AnswerLayout";
import Message from "./Message";
function QuestionAnswering() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [question, setQuestion] = useState("");
  const [useDatabase, setUseDatabase] = useState(false);
  const [answerLoaded, setAnswerLoaded] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [answer, setAnswer] = useState({});
  const { askQuestion, answerLoading } = useQuestionAnswering();
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
  const handleAskQuestion = async (question) => {
    setAnswer({});
    setAnswerLoaded(false);
    handleSetMessage("");
    if (!question || question === "") {
      handleSetMessage("Please enter a question", true);
      return;
    }
    const result = await askQuestion(question);
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
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <TextField
            type="text"
            value={question}
            onChange={(e) => handleSetQuestion(e.target.value)}
            placeholder="Ask something from the newspaper article"
            style={{ marginRight: "10px", marginBottom: "0" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleAskQuestion(question);
            }}
            style={{ marginBottom: "0" }}
          >
            Ask
          </Button>
        </div>
      )}

      <Message message={message} isError={isError} />

      {answerLoading && <CircularProgress />}
      {answerLoaded && (
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
