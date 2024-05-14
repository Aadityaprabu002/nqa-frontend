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
function QuestionAnswering() {
  const [message, setMessage] = useState("");
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
    setMessage("");
  };
  const handleHasProcessed = (value) => {
    setHasProcessed(value);
  };
  const handleSetMessage = (value) => {
    setMessage(value);
  };
  const handleAskQuestion = async (question) => {
    setAnswer({});
    setAnswerLoaded(false);
    const result = await askQuestion(question);
    if (result.message) {
      setMessage(result.message);
    } else {
      setAnswer(result);
      setAnswerLoaded(true);
    }
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
            onChange={(e) => setQuestion(e.target.value)}
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

      {message && <div>{message}</div>}
      {answerLoading && <CircularProgress />}
      {answerLoaded && <AnswerLayout answer={answer} />}
    </div>
  );
}

export default QuestionAnswering;
