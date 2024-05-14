import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
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
}));

export default styles;
