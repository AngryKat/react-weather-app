import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { getCities } from "../../api";

export interface City {
  id: number;
  label: string;
  value: string;
}

const Search = ({ onSearch }: { onSearch: (searchValue: City | null) => void }) => {
  const [finalValue, setFinalValue] = React.useState<City | null>(null);
  const [searchedOptions, setSearchedOptions] = React.useState<City[]>(
    []
  );

  const fetchOptions = async (matchValue: string) => {
    if (matchValue === "") return;
    const response = await getCities(matchValue);
    if (response) {
      setSearchedOptions(
        response.data.map((city) => ({
          id: city.id,
          label: `${city.name}, ${city.countryCode}`,
          value: `${city.latitude} ${city.longitude}`,
        }))
      );
    }
  };

  const fetchOptionsDebounced = debounce(fetchOptions, 1000);

  return (
    <Autocomplete
      id="serach-locations"
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={searchedOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={finalValue}
      noOptionsText="No locations"
      onChange={(event: any, newValue: City | null) => {
        setFinalValue(newValue);
        onSearch(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        fetchOptionsDebounced(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
    />
  );
};

export default Search;
