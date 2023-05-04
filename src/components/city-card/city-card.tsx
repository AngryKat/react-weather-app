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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCurrentWeather } from "../../api";
import { selectCityById } from "../../store/cities/selectors";
import { removeCity } from "../../store/cities/actions";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import dayjs from "dayjs";
import CityCardSkeleton from "./card-skeleton";
import CityCardError from "./card-error";

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

const CityWeatherInfo = ({ currentWeather, showDetailedInfo }: any) => (
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
              fieldName="Feels like"
              fieldValue={`${currentWeather.main.feels_like.toFixed()}°C`}
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
            fieldName="Wind"
            fieldValue={`${currentWeather.wind.speed}m/s`}
            fieldProps={{
              variant: "body1",
            }}
          />
          <BoldFieldValueText
            fieldName="ESE"
            fieldValue={`${currentWeather.main.pressure}hPa`}
            fieldProps={{
              variant: "body1",
            }}
          />
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={0.5}>
          <BoldFieldValueText
            fieldName="Humidity"
            fieldValue={`${currentWeather.main.humidity}%`}
            fieldProps={{
              variant: "body1",
            }}
          />
          <BoldFieldValueText
            fieldName="Visibility"
            fieldValue={`${(currentWeather.visibility / 1000).toFixed(1)}km`}
            fieldProps={{
              variant: "body1",
            }}
          />
        </Stack>
      </Grid>
      {showDetailedInfo && (
        <>
          <Grid item>
            <Stack spacing={0.5}>
              <BoldFieldValueText
                fieldName="Min"
                fieldValue={`${currentWeather.main.temp_min}°C`}
                fieldProps={{
                  variant: "body1",
                }}
              />
              <BoldFieldValueText
                fieldName="Max"
                fieldValue={`${currentWeather.main.temp_max}°C`}
                fieldProps={{
                  variant: "body1",
                }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={0.5}>
              <BoldFieldValueText
                fieldName="Sunrise"
                fieldValue={`${dayjs(currentWeather.sys.sunrise * 1000).format(
                  "h:mm A (UTCZ)"
                )}`}
                fieldProps={{
                  variant: "body1",
                }}
              />

              <BoldFieldValueText
                fieldName="Sunset"
                fieldValue={`${dayjs(currentWeather.sys.sunset * 1000).format(
                  "h:mm A (UTCZ)"
                )}`}
                fieldProps={{
                  variant: "body1",
                }}
              />
            </Stack>
          </Grid>
        </>
      )}

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
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentWeather", city.coords],
    queryFn: () => getCurrentWeather(city.coords),
    refetchOnWindowFocus: false,
  });
  const dispatch = useAppDispatch();
  const handleRetry = () => {
    refetch();
  };
  if (isLoading) {
    return <CityCardSkeleton gridCard={gridCard} />;
  }
  if (isError) {
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
        {gridCard ? (
          <Link to={`/city/${city.id}`}>
            <Button size="small" endIcon={<ArrowForwardIcon />}>
              Details
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button size="small" startIcon={<ArrowBackIcon />}>
              Return
            </Button>
          </Link>
        )}
        <Button
          endIcon={<RefreshIcon />}
          onClick={() => {
            refetch();
          }}
        >
          Refresh
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
