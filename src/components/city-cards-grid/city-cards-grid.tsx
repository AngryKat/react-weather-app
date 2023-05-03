import { Grid } from "@mui/material";
import CityCard from "../city-card/city-card";
import Empty from "./empty";
import { useSelector } from "react-redux";
import { selectCitiesIds } from "../../store/cities-reducer/selectors";

const CityCardsGrid = () => {
  const citiesIds = useSelector(selectCitiesIds);
  console.log("aaa ", { citiesIds });
  if (citiesIds.length === 0) {
    return <Empty />;
  }
  return (
    <Grid container spacing={6} alignItems="center">
      {citiesIds.map((id) => {
        return (
          <Grid item key={id}>
            <CityCard id={id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CityCardsGrid;
