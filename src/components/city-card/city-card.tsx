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
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getCurrentWeather } from "../../api";
import { selectCityById } from "../../store/cities/selectors";
import { removeCity } from "../../store/cities/actions";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Coords } from "../types";
import dayjs from "dayjs";

const cardsContentFields = (currentWeather: any) => [
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
  {
    fieldName: "Feels like",
    fieldValue: `${currentWeather.main.feels_like.toFixed()}°C`,
  },
];

const BoldFieldValueText = ({
  fieldName,
  fieldValue,
  fieldProps,
}: {
  fieldName: number | string;
  fieldValue: number | string;
  fieldProps?: React.ComponentProps<typeof Typography>;
}) => (
  <Typography variant="subtitle1" {...fieldProps} sx={{ fontWeight: "bold" }}>
    {fieldName}: <Typography display="inline">{fieldValue}</Typography>
  </Typography>
);

export const useFetchCityWeather = (coords: Coords) =>
  useQuery({
    queryKey: ["currentWeather", coords],
    queryFn: () => getCurrentWeather(coords),
    refetchOnWindowFocus: false,
  });

const DetailsLink = forwardRef((props: any, ref: any) => (
  <Link ref={ref} to={props.href}>
    {props.children}
  </Link>
));

export const CityWeatherInfo = ({ currentWeather, showDetailedInfo }: any) => (
  <Stack spacing={4} sx={{ paddingRight: 2, paddingLeft: 1, paddingTop: 2 }}>
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
              fieldText="Feels like"
              valueText={`${currentWeather.main.feels_like.toFixed()}°C`}
            />
          </div>
        </Stack>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item>
        <Stack spacing={0.5}>
          <BoldFieldValueText
            fieldText="Wind"
            valueText={`${currentWeather.wind.speed}m/s`}
            fieldProps={{
              variant: "body1",
            }}
          />

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
      <Grid item>
        <Stack spacing={0.5}>
          <Typography variant="body1">
            Min: {currentWeather.main.temp_min}
          </Typography>
          <Typography variant="body1">
            Max: {currentWeather.main.temp_max}
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={0.5}>
          <Typography variant="body1">
            Sunrise:{" "}
            {dayjs(currentWeather.sys.sunrise * 1000).format("h:mm A (UTCZ)")}{" "}
          </Typography>
          <Typography variant="body1">
            Sunset:{" "}
            {dayjs(currentWeather.sys.sunset * 1000).format("h:mm A (UTCZ)")}{" "}
          </Typography>
        </Stack>
      </Grid>
      <Grid item />
    </Grid>
  </Stack>
);

const CityCard = ({
  id,
  gridCard = false,
}: {
  id: number;
  gridCard?: boolean;
}) => {
  const city = useAppSelector(selectCityById(id));
  const {
    data: currentWeather,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentWeather", city.coords],
    queryFn: () => getCurrentWeather(city.coords),
    refetchOnWindowFocus: false,
  });
  const dispatch = useAppDispatch();

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

  console.log("aaa ", { currentWeather });

  return (
    <Card>
      <CardHeader
        sx={{ backgroundColor: "#ffa733", padding: "1rem 2rem" }}
        title={city.name}
        subheader={currentWeather.weather[0].description}
        action={
          gridCard && (
            <IconButton
              aria-label="remove"
              onClick={() => dispatch(removeCity({ id: city.id }))}
            >
              <ClearIcon />
            </IconButton>
          )
        }
      />
      <CardContent sx={{ padding: "1rem" }}>
        <CityWeatherInfo
          currentWeather={currentWeather}
          showDetailedInfo={!gridCard}
        />
      </CardContent>
      <CardActions>
        <Button
          endIcon={<RefreshIcon />}
          onClick={() => {
            refetch();
          }}
        >
          Refresh
        </Button>
        {gridCard && (
          <Button
            href={`/city/${city.id}`}
            size="small"
            component={DetailsLink}
            endIcon={<ArrowForwardIcon />}
          >
            Details
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CityCard;
