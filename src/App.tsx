import { Container, styled } from "@mui/material";

import "./App.css";

import { Outlet } from "react-router-dom";

const AppContainer = styled(Container)({
  height: "100%",
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
