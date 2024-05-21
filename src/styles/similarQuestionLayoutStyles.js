import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  question: {
    border: "black 1px solid ",
    margin: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    "&:hover": {
      background: "#ffebeb",
    },
  },
  notFindResult: {},
}));

export default styles;
