import { Container, CssBaseline } from "@mui/material";
import CityCardsGridPage from "./pages/city-cards-grid-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { Provider } from "react-redux";
import { store } from "./store";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
        <CssBaseline />
        <Container sx={{ height: "100%" }}>
          <Outlet />
        </Container>
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
