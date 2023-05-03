import { Grid } from "@mui/material";
import CityCard from "../city-card/city-card";
import { City } from "../types";

const CityCardsGrid = ({ cities }: { cities: City[] }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      {cities.length !== 0 &&
        cities.map((city) => {
          return (
            <Grid item key={city.id}>
              <CityCard city={city} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CityCardsGrid;
