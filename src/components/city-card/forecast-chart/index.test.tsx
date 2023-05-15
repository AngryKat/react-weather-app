import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import { store } from "../../../store";
import { QueryClient } from "@tanstack/react-query";
import * as api from "../../../utils/api";
import ForecastChart from ".";

jest.mock("../../../utils/api", () => ({
  getForecast: jest.fn(),
}));

describe("ForecastChart", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const mockCoords = {
    lat: 50.45,
    lon: 30.523611111,
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

  it("should render error when failed to load weather", async () => {
    (api.getForecast as jest.Mock).mockImplementation(
      () => new Promise((resolve, reject) => reject())
    );
    renderWithProviders(<ForecastChart coords={mockCoords} />, {
      store,
      client: queryClient,
    });
    expect(
      await screen.findByText(/error while loading forecast/i)
    ).toBeInTheDocument();
  });
  it("should render loading spinner when data is fetching", async () => {
    (api.getForecast as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderWithProviders(<ForecastChart coords={mockCoords} />, {
      store,
      client: queryClient,
    });
    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });
});
