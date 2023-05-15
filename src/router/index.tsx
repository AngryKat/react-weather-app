import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "../App";
import CityCardsGridPage from "../pages/city-cards-grid-page";
import WeatherDetailsPage from "../pages/city-weather-details-page";
import { ErrorPage } from "./error-page";

// use hash router for github pages integration
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CityCardsGridPage />,
      },
      {
        path: "city/:id",
        element: <WeatherDetailsPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
