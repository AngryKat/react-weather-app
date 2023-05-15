import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CityCardsGridPage from "../pages/city-cards-grid-page";
import WeatherDetailsPage from "../pages/city-weather-details-page";
import { ErrorPage } from "./error-page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <CityCardsGridPage />,
        },
        {
          path: "/city/:id",
          element: <WeatherDetailsPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export const AppRouter = () => <RouterProvider router={router} />;
