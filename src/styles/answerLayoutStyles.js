import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  answerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navigator: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "stretch",
  },
  relevancyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "green",
    fontSize: "1.5rem",
  },
}));

export default styles;
