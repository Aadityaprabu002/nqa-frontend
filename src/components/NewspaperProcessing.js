import { Button, CircularProgress, Input } from "@mui/material";
import React, { useState } from "react";
import useNewspaperProcessing from "../hooks/useNewspaperProcessing";
import styles from "../styles/newspaperProcessingStyles";
const NewspaperProcessing = ({
  handleHasProcessed,
  hasProcessed,
  handleSetMessage,
}) => {
  const [file, setFile] = useState(null);
  const [hasFileUploaded, setHasFileUploaded] = useState(false);
  const { process, isProcessing } = useNewspaperProcessing(
    handleHasProcessed,
    handleSetMessage
  );

  const handleProcess = () => {
    process(file);
  };
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      if (
        uploadedFile.size > 10 * 1024 * 1024 ||
        uploadedFile.type !== "application/pdf"
      ) {
        handleSetMessage("File size must be pdf and less than 10MB");
        setFile(null);
        setHasFileUploaded(false);
        return;
      }
      setFile(uploadedFile);
      setHasFileUploaded(true);
    }
  };
  const classes = styles();
  return isProcessing ? (
    <CircularProgress />
  ) : (
    !hasProcessed && (
      <div className={classes.container}>
        <div className={classes.fileUpload}>
          <Input color="secondary" type="file" onChange={handleFileChange} />
          {hasFileUploaded && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProcess}
            >
              Process
            </Button>
          )}
        </div>
      </div>
    )
  );
};
export default NewspaperProcessing;
