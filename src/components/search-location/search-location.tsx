import { useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { getCities } from "../../api";
import { City } from "../types";

type SearchValue = City & { label: string };
const Search = ({
  onSearch,
}: {
  onSearch: (searchValue: City | null) => void;
}) => {
  const [matchValue, setMatchValue] = useState("");
  const [finalValue, setFinalValue] = useState<SearchValue | null>(null);
  const { data: locationOptions } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["search", matchValue],
    queryFn: () => getCities(matchValue),
  });

  const transformedLocationOptions = locationOptions
    ? locationOptions.data.map((city) => ({
        id: city.id,
        label: `${city.name}, ${city.countryCode}`,
        name: city.name,
        countryCode: city.countryCode,
        coords: { lat: city.latitude, lon: city.longitude },
      }))
    : [];

  const handleOnInputChange = debounce((event, newInputValue) => {
    const [cityName] = newInputValue.split(",");
    setMatchValue(cityName);
  }, 1100);

  return (
    <Autocomplete
      id="search-locations"
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.label}
      options={transformedLocationOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={finalValue}
      noOptionsText={
        !locationOptions ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          "No location found"
        )
      }
      onChange={(event: any, newValue: SearchValue | null) => {
        setFinalValue(newValue);
        onSearch(newValue as City);
      }}
      onInputChange={handleOnInputChange}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
    />
  );
};

export default memo(Search);
