import { Grid } from "@mui/material";
import CityCard from "../city-card";
import Empty from "./empty";
import { selectCitiesIds } from "../../store/cities/selectors";
import { useAppSelector } from "../../store/hooks";

const CityCardsGrid = () => {
  const citiesIds = useAppSelector(selectCitiesIds);
  return (
    <Grid
      data-testid="city-cards-grid"
      container
      rowSpacing={{ xs: 1, sm: 2 }}
      columnSpacing={{ xs: 1, sm: 2 }}
      alignItems="center"
    >
      {citiesIds.length === 0 ? (
        <Empty />
      ) : (
        citiesIds.map((id) => (
          <Grid item key={id}>
            <CityCard id={id} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CityCardsGrid;
