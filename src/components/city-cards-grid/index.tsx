import { Grid } from "@mui/material";
import CityCard from "../city-card/city-card";
import Empty from "./empty";
import { selectCitiesIds } from "../../store/cities/selectors";
import { useAppSelector } from "../../store/hooks";

const CityCardsGrid = () => {
  const citiesIds = useAppSelector(selectCitiesIds);

  if (citiesIds.length === 0) {
    return <Empty />;
  }
  return (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2 }}
      columnSpacing={{ xs: 1, sm: 2 }}
      alignItems="center"
    >
      {citiesIds.map((id) => (
        <Grid item key={id}>
          <CityCard id={id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CityCardsGrid;
