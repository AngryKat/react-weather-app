import { Stack } from "@mui/material";
import CityWeatherDetails from "../components/city-weather-details/index";

const CityCardsGridPage = () => {
  return (
    <Stack alignItems="center" p={3} spacing={2} sx={{ height: "100%" }}>
      <CityWeatherDetails />
    </Stack>
  );
};

export default CityCardsGridPage;
