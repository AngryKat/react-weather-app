import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import { store } from "../../../store";
import { QueryClient } from "@tanstack/react-query";
import { FetchStatus } from "../../../utils/types";
import { configureStore } from "@reduxjs/toolkit";
import { citiesSlice } from "../../../store/cities";
import CityCardDetailed from ".";

jest.mock("../../../utils/api", () => ({
  getForecast: jest.fn(),
}));

describe("CityCardDetailed", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

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
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  const reduxStore: typeof store = configureStore({
    reducer: {
      cities: citiesSlice.reducer,
    },
    preloadedState: mockStoreInitData,
  });

  it("should render no city error when invalid city id", async () => {
    const mockNonExistentId = 0;
    renderWithProviders(<CityCardDetailed id={mockNonExistentId} />, {
      store: reduxStore,
      client: queryClient,
    });
    expect(
      await screen.findByText(/there is no city with such id in the storage/i)
    ).toBeInTheDocument();
  });
});
