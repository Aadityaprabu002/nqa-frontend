import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Layout from "./components/Layout";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0f0f",
    },
    secondary: {
      main: "#ff4545",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout />
      </div>
    </ThemeProvider>
  );
}

export default App;
