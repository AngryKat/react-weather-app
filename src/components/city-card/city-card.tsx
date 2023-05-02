import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { City } from "../search/search";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../../api";

// interface WeatherInfo {
//     feels_like: string;
//     curr_temp: string;
//     wind_speed: string;
// }

// const openWeatherAdapter = (openWeatherData) => {

// }

const CityCard = ({ city }: { city: City }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const [lat, lon] = city.value.split(" ");
      const weather = await getCurrentWeather(lat, lon);
      setCurrentWeather(weather);
    };
    fetchCurrentWeather();
  }, [city.value]);
  return (
    <Card>
      {currentWeather && (
        <CardContent>
          <Stack spacing={2}>
            <Stack>
              <Typography variant="h6">{city.label}</Typography>
              <Typography variant="subtitle2">
                Feels like: {currentWeather.main.feels_like}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography variant="h4">{currentWeather.main.temp} C</Typography>
              <div>Icon is here!</div>
            </Stack>
            <Typography variant="body1">
              <Grid container spacing={4}>
                <Grid item>
                  <Stack spacing={0.5}>
                    <span>{currentWeather.wind.speed}m/s </span>
                    <span>ESE 1027hPa</span>
                    <span>Humidity: 74%</span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack spacing={0.5}>
                    <span>UV: 3</span>
                    <span>Dew point: 8°C</span>
                    <span>Visibility: 10.0km</span>
                  </Stack>
                </Grid>
              </Grid>
            </Typography>
          </Stack>
        </CardContent>
      )}

      <CardActions>
        <Button size="small" variant="contained">
          View forecast
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
