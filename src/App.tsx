import "./App.css";
import { Container, CssBaseline, Grid, Stack } from "@mui/material";
import Search from "./components/search";
import CityCard from "./components/city-card/city-card";
import { useState } from "react";
import { City } from "./components/search/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const handleSearch = (searchValue: City | null) => {
    if (searchValue) {
      if (cities.some((city) => city.id === searchValue.id)) return;
      setCities((prev) => prev.concat(searchValue));
    }
  };
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <CssBaseline />
      <Container>
        <Stack justifyContent="center" alignItems="center" p={3} spacing={2}>
          <Search onSearch={handleSearch} />
          <Grid container spacing={2} alignItems="center">
            {cities.length !== 0 &&
              cities.map((city) => (
                <Grid item>
                  <CityCard city={city} key={city.id} />
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
