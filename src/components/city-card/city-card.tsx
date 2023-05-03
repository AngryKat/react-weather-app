import { useQuery } from "@tanstack/react-query";
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
  CardHeader,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import { getCurrentWeather } from "../../api";
import { City } from "../types";
import { removeCityFromLocalStorage } from "../utils";

const CityCard = ({ city }: { city: City }) => {
  const [lat, lon] = city.coords.split(" ");
  const {
    isLoading,
    data: currentWeather,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentWeather", lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <>Oh no</>;
  }

  return (
    <Card>
      <CardHeader
        title={city.name}
        subheader={currentWeather.weather[0].description}
        action={
          <IconButton
            aria-label="remove"
            onClick={() => removeCityFromLocalStorage(city.id)}
          >
            <ClearIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Stack spacing={2}>
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
          <Grid container spacing={4}>
            <Grid item>
              <Stack spacing={0.5}>
                <Typography variant="body1">
                  Wind: {currentWeather.wind.speed}m/s
                </Typography>
                <Typography variant="body1">
                  ESE {currentWeather.main.pressure}hPa
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack spacing={0.5}>
                <Typography variant="body1">
                  Humidity: {currentWeather.main.humidity}%
                </Typography>
                <Typography variant="body1">
                  Visibility: {(currentWeather.visibility / 1000).toFixed(1)}
                  km
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Refresh
        </Button>
        <Button
          href={`/city/${city.id}`}
          size="small"
          endIcon={<ArrowForwardIcon />}
        >
          details and forecast
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
