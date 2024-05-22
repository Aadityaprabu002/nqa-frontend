import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  layoutContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  leftDivision: {
    margin: "5%",
    flexGrow: 1,
    width: "50%",
    "&:hover": {
      background: "#f7fbff",
    },
  },
  rightDivision: {
    margin: "5%",
    flexGrow: 1,
    width: "50%",
    "&:hover": {
      background: "#f7fbff",
    },
  },
}));

export default styles;
