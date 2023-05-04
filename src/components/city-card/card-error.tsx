import { useQuery } from "@tanstack/react-query";
import {
  Button,
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
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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

const CityCardError = ({
  onRetry,
  gridCard = false,
}: {
  onRetry: () => void;
  gridCard?: boolean;
}) => {
  return (
    <Box
      sx={{
        width: gridCard ? "360px" : "720px",
        height: "356px",
        bgcolor: "#bdbdbd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SentimentVeryDissatisfiedIcon />
        <div>Error occurred</div>
        <Button onClick={onRetry}>Retry</Button>
      </Stack>
    </Box>
  );
};

export default CityCardError;
