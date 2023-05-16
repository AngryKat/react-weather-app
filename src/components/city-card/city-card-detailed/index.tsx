import { useQuery } from "@tanstack/react-query";
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
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCurrentWeather } from "../../../utils/api";
import { Link } from "react-router-dom";
import CityCardSkeleton from "../common/card-skeleton";
import CityCardError from "../common/card-fetch-error";
import { selectCityById } from "../../../store/cities/selectors";
import { useAppSelector } from "../../../store/hooks";
import WeatherInfo from "../common/weather-info";
import ForecastChart from "../forecast-chart";
import RefreshButton from "../common/refresh-button";
import { BoldFieldValueText } from "../common/bold-field-value-text";
import { CityId } from "../../../utils/types";

const CityCardDetailed = ({ id }: { id: CityId }) => {
  const city = useAppSelector(selectCityById(id));
  const {
    data: currentWeatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["currentWeather", city?.coords],
    queryFn: () => getCurrentWeather(city?.coords),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!city,
  });

  

  const handleRetry = () => {
    refetch();
  };

  if (isWeatherError) {
    return <CityCardError onRetry={handleRetry} />;
  }

  if (!city || isWeatherLoading) {
    return <CityCardSkeleton />;
  }

  const { name, countryCode, coords } = city;
  const {
    weather: [{ description, icon }],
    main: { temp, feels_like },
  } = currentWeatherData;
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
              {name}, {countryCode}
            </span>
            <span>{isRefetching && <CircularProgress size={15} />}</span>
          </div>
        }
        subheader={description}
        action={<RefreshButton onRefresh={handleRetry} />}
      />
      <CardContent>
        <Stack p={1} spacing={4}>
          <Grid container>
            <Grid item>
              <Stack direction="row" spacing={1}>
                <img
                  width={60}
                  height={60}
                  alt={`weather icon for ${description}`}
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                />
                <div>
                  <Typography variant="h4">{temp.toFixed()}°C</Typography>
                  <BoldFieldValueText
                    fieldName="Feels like"
                    fieldValue={`${feels_like.toFixed()}°C`}
                  />
                </div>
              </Stack>
            </Grid>
          </Grid>
          <WeatherInfo currentWeather={currentWeatherData} detailed />
          <ForecastChart coords={coords} isRefetching={isRefetching} />
        </Stack>
      </CardContent>
      <CardActions>
        <Link to="/">
          <Button size="small" startIcon={<ArrowBackIcon />}>
            Return
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CityCardDetailed;
