import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

import App, { CitiesFetcher } from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  BrowserRouter,
  LoaderFunction,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import CityCardsGridPage from "./pages/city-cards-grid-page";
import WeatherDetailsPage from "./pages/weather-details-page";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();
const router = createBrowserRouter([
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
        loader({ params }) {
          try {
            const { id } = params;
            if (!id || !id.match(/^\d+$/)) {
              throw Error("Invalid id");
            }
            return +id;
          } catch (error) {
            return redirect("/");
          }
        },
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CitiesFetcher>
          <RouterProvider router={router} />
        </CitiesFetcher>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
