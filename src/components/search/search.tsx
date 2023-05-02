import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { getCities } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export interface City {
  id: number;
  label: string;
  value: string;
}

const Search = ({
  onSearch,
}: {
  onSearch: (searchValue: City | null) => void;
}) => {
  const [matchValue, setMatchValue] = useState("");
  const [finalValue, setFinalValue] = useState<City | null>(null);
  const { data: searchedOptions, isLoading, refetch } = useQuery({
    queryKey: ["searchValue"],
    queryFn: () => getCities(matchValue),
    // initialData: "",
  });

  if (!searchedOptions) return <>Hello!</>;

  const transformedSearchedOptions = searchedOptions.data.map((city) => ({
    id: city.id,
    label: `${city.name}, ${city.countryCode}`,
    value: `${city.latitude} ${city.longitude}`,
  }));

  const refetchOptionsDebounced = debounce(refetch, 1000);

  return (
    <Autocomplete
      id="serach-locations"
      sx={{ width: 300 }}
      filterOptions={(x) => x}
      options={transformedSearchedOptions}
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
        setMatchValue(newInputValue);
        refetchOptionsDebounced();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add a location"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
