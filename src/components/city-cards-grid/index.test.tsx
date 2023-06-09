import { QueryClient } from "@tanstack/react-query";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CityCardsGrid from ".";
import { store } from "../../store";
import { citiesSlice } from "../../store/cities";
import { configureStore } from "@reduxjs/toolkit";
import { FetchStatus } from "../../utils/types";

describe("CityCardsGrid", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
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
  it("should render without errors", () => {
    renderWithProviders(<CityCardsGrid />, { store, client: queryClient });
    expect(screen.getByTestId("city-cards-grid")).toBeInTheDocument();
  });
  it("should render Empty component when citiesIds is empty array", () => {
    const mockStoreInitData = {
      cities: {
        allIds: [],
        status: FetchStatus.succeeded,
        error: undefined,
      },
    };
    const store = configureStore({
      reducer: {
        cities: citiesSlice.reducer,
      },
      preloadedState: mockStoreInitData,
    });
    renderWithProviders(<CityCardsGrid />, { store, client: queryClient });
    expect(screen.getByText(/no cities yet/i)).toBeInTheDocument();
  });
});
