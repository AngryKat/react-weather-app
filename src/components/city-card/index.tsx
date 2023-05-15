import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Stack,
  CircularProgress,
  CardHeader,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import { getCurrentWeather } from "../../utils/api";
import { selectCityById } from "../../store/cities/selectors";
import { removeCity } from "../../store/cities/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CityCardSkeleton from "./common/card-skeleton";
import CityCardError from "./common/card-fetch-error";
import WeatherInfo from "./common/weather-info";
import { BoldFieldValueText } from "./common/bold-field-value-text";
import RefreshButton from "./common/refresh-button";
import { removeCityFromLocalStorage } from "../../utils";
import { CityId } from "../../utils/types";

const CityCard = ({ id }: { id: CityId }) => {
  const city = useAppSelector(selectCityById(id));
  const {
    data: currentWeather,
    isLoading: isWeatherLoading,
    isRefetching,
    isError: isWeatherError,
    refetch,
  } = useQuery({
    queryKey: ["currentWeather", city!.coords],
    queryFn: () => getCurrentWeather(city!.coords),
    refetchOnWindowFocus: false,
    enabled: !!city,
  });
  const dispatch = useAppDispatch();
  const handleRetry = () => {
    refetch();
  };

  const handleRemove = () => {
    dispatch(removeCity({ id }));
    removeCityFromLocalStorage(id);
  };

  if (isWeatherLoading) {
    return <CityCardSkeleton gridCard />;
  }
  if (isWeatherError) {
    return <CityCardError onRetry={handleRetry} gridCard />;
  }

  return (
    <Card>
      <CardHeader
        sx={{
          backgroundColor: "#ffa733",
          padding: "1rem 2rem",
          color: "#ffffff",
        }}
        title={
          <div style={{ height: 30 }}>
            <span>
              {city.name}, {city.countryCode}
            </span>
            <span>{isRefetching && <CircularProgress size={15} />}</span>
          </div>
        }
        subheader={currentWeather.weather[0].description}
        action={
          <IconButton aria-label="remove" onClick={handleRemove}>
            <ClearIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Stack p={1} spacing={4}>
          <Grid container>
            <Grid item>
              <Stack direction="row" spacing={1}>
                <img
                  width={60}
                  height={60}
                  alt={`weather icon for ${currentWeather.weather[0].description}`}
                  src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
                />
                <div>
                  <Typography variant="h4">
                    {currentWeather.main.temp.toFixed()}°C
                  </Typography>
                  <BoldFieldValueText
                    fieldName="Feels like"
                    fieldValue={`${currentWeather.main.feels_like.toFixed()}°C`}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>
          <WeatherInfo currentWeather={currentWeather} />
        </Stack>
      </CardContent>
      <CardActions>
        <Link to={`city/${id}`}>
          <Button size="small" endIcon={<ArrowForwardIcon />}>
            Details
          </Button>
        </Link>
        <RefreshButton onRefresh={handleRetry} />
      </CardActions>
    </Card>
  );
};

export default CityCard;
