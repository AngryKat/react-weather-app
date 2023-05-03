import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/home-page";
import "./App.css";
import WeatherDetails from "./pages/weather-details-page";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/city/:id",
    element: <WeatherDetails />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
