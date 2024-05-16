import React from "react";

const Message = ({ message, isError }) => {
  console.log(isError);
  if (message === "") {
    return <div></div>;
  } else if (isError) {
    return (
      <div>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: "green" }}>{message}</p>
    </div>
  );
};

export default Message;
