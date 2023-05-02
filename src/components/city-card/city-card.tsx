import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { City } from "../search/search";
import { getCurrentWeather } from "../../api";
import { useQuery } from "@tanstack/react-query";

const CityCard = ({ city }: { city: City }) => {
  const [lat, lon] = city.value.split(" ");
  const { isLoading, data: currentWeather } = useQuery({
    queryKey: [`currentWeather_${lat}_${lon}`],
    queryFn: () => getCurrentWeather(lat, lon),
  });

  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h6">{city.label}</Typography>
            <Typography variant="subtitle2">
              {currentWeather.weather[0].description}
            </Typography>
          </Stack>
          <Stack direction="row">
            <img
              width={60}
              height={60}
              alt={`weather icon for ${currentWeather.weather[0].description}`}
              src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
            />
            <Typography variant="h4">
              {currentWeather.main.temp.toFixed()}°C
              <Typography variant="subtitle1">
                Feels like {currentWeather.main.feels_like.toFixed()}°C
              </Typography>
            </Typography>
          </Stack>
          <Typography variant="body1">
            <Grid container spacing={4}>
              <Grid item>
                <Stack spacing={0.5}>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Wind: {currentWeather.wind.speed}m/s{" "}
                  </span>
                  <span>ESE {currentWeather.main.pressure}hPa</span>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={0.5}>
                  <span>Humidity: {currentWeather.main.humidity}%</span>
                  <span>
                    Visibility: {(currentWeather.visibility / 1000).toFixed(1)}
                    km
                  </span>
                </Stack>
              </Grid>
            </Grid>
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" endIcon={<ArrowForwardIcon />}>
          details and forecast
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
