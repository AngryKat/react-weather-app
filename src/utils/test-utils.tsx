import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

export function renderWithClient(client: QueryClient, ui: React.ReactElement) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  };
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store,
    client,
  }: { store: any; client: QueryClient; }
) {
  const { rerender, ...result } = render(
    <BrowserRouter>
      <ReduxProvider store={store}>
        <QueryClientProvider client={client}>{ui}</QueryClientProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <BrowserRouter>
          <ReduxProvider store={store}>
            <QueryClientProvider client={client}>
              {rerenderUi}
            </QueryClientProvider>
          </ReduxProvider>
        </BrowserRouter>
      ),
  };
}
