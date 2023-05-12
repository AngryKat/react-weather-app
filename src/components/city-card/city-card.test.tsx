import { configureStore } from "@reduxjs/toolkit";
import { renderWithProviders } from "../../utils/test-utils";
import { FetchStatus } from "../../utils/types";
import CityCard from "./city-card";
import { citiesSlice } from "../../store/cities";
import { store } from "../../store";
import { QueryClient } from "@tanstack/react-query";
import { screen } from "@testing-library/react";
import * as api from "../../utils/api";

jest.mock("../../utils/api", () => ({
  getCurrentWeather: jest.fn(),
}));

describe("CityCard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  const mockWeather = {
    weather: [
      {
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    main: {
      temp: 11.22,
      feels_like: 9.47,

      pressure: 1028,
      humidity: 41,
    },
    visibility: 10000,
    wind: {
      speed: 4.44,
    },
  };
  const mockStoreInitData = {
    cities: {
      3520102: {
        id: 3520102,
        name: "Kyiv",
        countryCode: "UA",
        coords: {
          lat: 50.45,
          lon: 30.523611111,
        },
      },
      allIds: [3520102],
      status: FetchStatus.succeeded,
      error: undefined,
    },
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const reduxStore: typeof store = configureStore({
    reducer: {
      cities: citiesSlice.reducer,
    },
    preloadedState: mockStoreInitData,
  });

  it("should render without errors", async () => {
    (api.getCurrentWeather as jest.Mock).mockImplementation(() => mockWeather);
    renderWithProviders(<CityCard id={3520102} />, {
      store: reduxStore,
      client: queryClient,
    });
    expect(await screen.findByText("Kyiv, UA")).toBeInTheDocument();
  });

  it("should render correct header information", async () => {
    (api.getCurrentWeather as jest.Mock).mockImplementation(() => mockWeather);
    renderWithProviders(<CityCard id={3520102} />, {
      store: reduxStore,
      client: queryClient,
    });
    const locationName = await screen.findByText("Kyiv, UA");
    const mainTemperature = await screen.findByText("11°C");
    const feelsLike = await screen.findByText("9°C");

    expect(locationName).toBeInTheDocument();
    expect(mainTemperature).toBeInTheDocument();
    expect(feelsLike).toBeInTheDocument();
  });

  describe("CardSkeleton", () => {
    it("should render CardSkeleton when data is fetching", async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const reduxStore: typeof store = configureStore({
        reducer: {
          cities: citiesSlice.reducer,
        },
        preloadedState: mockStoreInitData,
      });
      (api.getCurrentWeather as jest.Mock).mockImplementation(
        () => new Promise(() => {})
      );
      renderWithProviders(<CityCard id={3520102} />, {
        store: reduxStore,
        client: queryClient,
      });
      expect(screen.getByTestId("city-card-skeleton")).toBeInTheDocument();
    });
  });

  describe("CardError", () => {
    it("should render error card when failed to load weather", async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const reduxStore: typeof store = configureStore({
        reducer: {
          cities: citiesSlice.reducer,
        },
        preloadedState: mockStoreInitData,
      });
      (api.getCurrentWeather as jest.Mock).mockImplementation(
        () => new Promise((resolve, reject) => reject())
      );
      renderWithProviders(<CityCard id={3520102} />, {
        store: reduxStore,
        client: queryClient,
      });
      expect(await screen.findByText("Error occurred")).toBeInTheDocument();
    });
  });
});
