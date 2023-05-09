import { useCallback } from "react";
import { Stack } from "@mui/material";

import { useDispatch } from "react-redux";
import { City } from "../../utils/types";
import { addCityToLocalStorage } from "../../utils";
import { addCity } from "../../store/cities/actions";
import SearchLocation from "../../components/search-location";
import CityCardsGrid from "../../components/city-cards-grid";

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
    <Stack alignItems="center" spacing={2} sx={{ height: "100%" }}>
      <SearchLocation onSearch={handleSearch} />
      <CityCardsGrid />
    </Stack>
  );
};

export default CityCardsGridPage;
