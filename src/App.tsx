import { Container, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./App.css";


const AppContainer = styled(Container)({
  minHeight: "100%",
  padding: "1rem",
  justifyContent: "center",
});

function App() {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
}

export default App;
