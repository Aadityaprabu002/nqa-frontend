import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
const Message = ({ message, isError }) => {
  console.log(isError);
  if (message === "") {
    return <div></div>;
  } else if (isError) {
    return <Typography color="secondary">{message}</Typography>;
  }

  return <Typography color={green[600]}>{message}</Typography>;
};

export default Message;
