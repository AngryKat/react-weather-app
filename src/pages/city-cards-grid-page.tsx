import { useCallback } from "react";
import { Stack } from "@mui/material";
import Search from "../components/search-location/search-location";
import CityCardsGrid from "../components/city-cards-grid/city-cards-grid";
import { City } from "../components/types";
import { addCityToLocalStorage } from "../components/utils";
import { useDispatch } from "react-redux";
import { addCity } from "../store/cities/actions";

const CityCardsGridPage = () => {
  const dispatch = useDispatch();
  const handleSearch = useCallback(
    (searchValue: City | null) => {
      if (searchValue) {
        console.log("aaa ", { searchValue });
        addCityToLocalStorage(searchValue);
        dispatch(addCity({ id: searchValue.id, cityData: searchValue }));
      }
    },
    [dispatch]
  );
  return (
    <Stack alignItems="center" p={3} spacing={2} sx={{ height: "100%" }}>
      <Search onSearch={handleSearch} />
      <CityCardsGrid />
    </Stack>
  );
};

export default CityCardsGridPage;
