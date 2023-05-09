import { useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { getCities } from "../../utils/api";
import { City } from "../../utils/types";

type SearchValue = City & { label: string };

const filterOptions = createFilterOptions<SearchValue>({ limit: 10 });

const Search = ({
  onSearch,
}: {
  onSearch: (searchValue: City | null) => void;
}) => {
  const [matchValue, setMatchValue] = useState("");
  const [finalValue, setFinalValue] = useState<SearchValue | null>(null);
  const { data: locationOptions, isFetching } = useQuery({
    queryKey: ["search", matchValue],
    queryFn: () => getCities(matchValue),
    refetchOnWindowFocus: false,
    enabled: !!matchValue,
  });

  const transformedLocationOptions = locationOptions
    ? locationOptions.map((city) => ({
        id: city.id,
        label: `${city.name}, ${city.countryCode}`,
        name: city.name,
        countryCode: city.countryCode,
        coords: { lat: city.latitude, lon: city.longitude },
      }))
    : [];

  // debounce to smooth API restriction for calls per second
  const handleInputChange = debounce((event, newInputValue) => {
    const [cityName] = newInputValue.split(",");
    setMatchValue(cityName);
  }, 1100);

  const handleChange = (event: any, newValue: SearchValue | null) => {
    setFinalValue(newValue);
    onSearch(newValue as City);
  };
  return (
    <Autocomplete
      id="search-locations"
      sx={{ width: 300 }}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.label}
      options={transformedLocationOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={finalValue}
      noOptionsText={
        isFetching ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          "No location found"
        )
      }
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
    />
  );
};

export default memo(Search);
