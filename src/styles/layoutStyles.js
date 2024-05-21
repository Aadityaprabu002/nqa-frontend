import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  layoutContainer: {
    display: "flex",
    justifyContent: "center",
  },
  leftDivision: {
    flexGrow: 1,
    width: "50%",
  },
  rightDivision: {
    flexGrow: 1,
    width: "50%",
  },
}));

export default styles;
