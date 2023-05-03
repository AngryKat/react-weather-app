import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import CityCardsGridPage from "./pages/city-cards-grid-page";
import WeatherDetailsPage from "./pages/weather-details-page";
import "./App.css";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <CityCardsGridPage />,
  },
  {
    path: "/city/:id",
    element: <WeatherDetailsPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Container sx={{ height: "100%" }}>
        <RouterProvider router={router} />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
