import { screen } from "@testing-library/react";

import SearchLocation from ".";
import { renderWithClient } from "../../utils/test-utils";
import { QueryClient } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { getCities } from "../../utils/api";

jest.mock("../../utils/api");

describe("Search component", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render without errors", () => {
    renderWithClient(queryClient, <SearchLocation onSearch={() => {}} />);
    expect(screen.getByLabelText("Add a location")).toBeInTheDocument();
  });
  it("should show No location found when options are empty", async () => {
    const user = userEvent.setup();
    renderWithClient(queryClient, <SearchLocation onSearch={() => {}} />);
    const searchInput = screen.getByLabelText("Add a location");
    await user.click(searchInput);
    await user.type(searchInput, "Kyiv");
    (getCities as jest.Mock).mockResolvedValueOnce([]);
    expect(screen.getByText("No location found")).toBeInTheDocument();
  });
  it("should show transformed label of a found option", async () => {
    const mockOption = {
      id: 3520102,
      name: "Kyiv",
      countryCode: "UA",
      latitude: 50.45,
      longitude: 30.523611111,
    };
    (getCities as jest.Mock).mockImplementationOnce(() => [mockOption]);
    const user = userEvent.setup();
    renderWithClient(queryClient, <SearchLocation onSearch={() => {}} />);
    const searchInput = screen.getByLabelText("Add a location");
    await user.click(searchInput);
    await user.type(searchInput, "Kyiv");
    expect(
      await screen.findByText("Kyiv, UA", {}, { timeout: 2000 })
    ).toBeInTheDocument();
  });
});
