import { useCallback } from "react";
import { Stack } from "@mui/material";
import Search from "../components/search-location";
import CityCardsGrid from "../components/city-cards-grid";
import { addCityToLocalStorage } from "../components/utils";
import { useDispatch } from "react-redux";
import { addCity } from "../store/cities/actions";
import { City } from "../types";

const CityCardsGridPage = () => {
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    (searchValue: City | null) => {
      if (searchValue) {
        addCityToLocalStorage(searchValue);
        dispatch(addCity({ id: searchValue.id, cityData: searchValue }));
      }
    },
    [dispatch]
  );
  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{ height: "100%" }}
    >
      <Search onSearch={handleSearch} />
      <CityCardsGrid />
    </Stack>
  );
};

export default CityCardsGridPage;
