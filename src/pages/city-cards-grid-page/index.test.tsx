import { QueryClient } from "@tanstack/react-query";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CityCardsGridPage from ".";
import { store } from "../../store";
import { FetchStatus } from "../../utils/types";
import { configureStore } from "@reduxjs/toolkit";
import { citiesSlice } from "../../store/cities";
import userEvent from "@testing-library/user-event";
import { getCities, getCurrentWeather } from "../../utils/api";

jest.mock("../../utils/api");

describe("CityCardsGridPage", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  it("should render Search and CityCardsGrid components", () => {
    renderWithProviders(<CityCardsGridPage />, { store, client: queryClient });
    expect(screen.getByLabelText("Add a location")).toBeInTheDocument();
    expect(screen.getByTestId("city-cards-grid")).toBeInTheDocument();
  });
  it("should add new city card to the grid on search complete", async () => {
    const mockCityOption = {
      id: 3520102,
      name: "Kyiv",
      countryCode: "UA",
      latitude: 50.45,
      longitude: 30.523611111,
    };
    const mockWeather = {
      coord: {
        lon: 30.5241,
        lat: 50.45,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      base: "stations",
      main: {
        temp: 11.22,
        feels_like: 9.47,
        temp_min: 11.22,
        temp_max: 11.22,
        pressure: 1028,
        humidity: 41,
        sea_level: 1028,
        grnd_level: 1008,
      },
      visibility: 10000,
      wind: {
        speed: 4.44,
        deg: 49,
        gust: 5.4,
      },
      clouds: {
        all: 93,
      },
      dt: 1683627488,
      sys: {
        country: "UA",
        sunrise: 1683598805,
        sunset: 1683653320,
      },
      timezone: 10800,
      id: 696050,
      name: "Pushcha-Vodytsya",
      cod: 200,
    };

    const mockStoreInitData = {
      cities: {
        allIds: [],
        status: FetchStatus.succeeded,
        error: undefined,
      },
    };
    const reduxStore: typeof store = configureStore({
      reducer: {
        cities: citiesSlice.reducer,
      },
      preloadedState: mockStoreInitData,
    });
    (getCities as jest.Mock).mockImplementationOnce(() => [mockCityOption]);
    (getCurrentWeather as jest.Mock).mockImplementationOnce(() => mockWeather);
    const user = userEvent.setup();
    renderWithProviders(<CityCardsGridPage />, {
      store: reduxStore,
      client: queryClient,
    });
    const searchInput = screen.getByLabelText("Add a location");
    await user.click(searchInput);
    await user.type(searchInput, "Kyiv");

    const option = await screen.findByText("Kyiv, UA", {}, { timeout: 2000 });
    await user.click(option);
    expect(screen.getByText("11°C")).toBeInTheDocument();
  });
  it("should remove city card from the grid when click clear button", async () => {
    const mockWeather = {
      coord: {
        lon: 30.5241,
        lat: 50.45,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      base: "stations",
      main: {
        temp: 11.22,
        feels_like: 9.47,
        temp_min: 11.22,
        temp_max: 11.22,
        pressure: 1028,
        humidity: 41,
        sea_level: 1028,
        grnd_level: 1008,
      },
      visibility: 10000,
      wind: {
        speed: 4.44,
        deg: 49,
        gust: 5.4,
      },
      clouds: {
        all: 93,
      },
      dt: 1683627488,
      sys: {
        country: "UA",
        sunrise: 1683598805,
        sunset: 1683653320,
      },
      timezone: 10800,
      id: 696050,
      name: "Pushcha-Vodytsya",
      cod: 200,
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
    const reduxStore: typeof store = configureStore({
      reducer: {
        cities: citiesSlice.reducer,
      },
      preloadedState: mockStoreInitData,
    });
    (getCurrentWeather as jest.Mock).mockImplementationOnce(() => mockWeather);
    const user = userEvent.setup();
    renderWithProviders(<CityCardsGridPage />, {
      store: reduxStore,
      client: queryClient,
    });
    const clearIcon = screen.getByTestId("clear-button-3520102")
    await user.click(clearIcon);
    expect(screen.getByText("No cities yet :c")).toBeInTheDocument();
  });
});
