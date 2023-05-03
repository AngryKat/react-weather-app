import { useCallback, useState } from "react";
import { Stack } from "@mui/material";
import Search from "../components/search/search";
import CityCardsGrid from "../components/city-cards-grid/city-cards-grid";
import { City } from "../components/types";
import { addCityToLocalStorage } from "../components/utils";

const Home = () => {
  const [cities, setCities] = useState<City[]>(
    localStorage.getItem("cities") === null
      ? []
      : JSON.parse(localStorage.getItem("cities")!)
  );
  const handleSearch = useCallback(
    (searchValue: City | null) => {
      if (searchValue) {
        if (cities.some((city) => city.id === searchValue.id)) return;
        setCities((prev) => prev.concat(searchValue));
        addCityToLocalStorage(searchValue);
      }
    },
    [cities]
  );
  return (
    <Stack justifyContent="center" alignItems="center" p={3} spacing={2}>
      <Search onSearch={handleSearch} />
      <CityCardsGrid cities={cities} />
    </Stack>
  );
};

export default Home;
