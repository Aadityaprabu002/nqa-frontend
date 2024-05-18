import { makeStyles } from "@material-ui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },
  askButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default styles;
