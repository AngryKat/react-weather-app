import { Grid, Stack, Divider } from "@mui/material";
import dayjs from "dayjs";
import { BoldFieldValueText } from "./bold-field-value-text";


const getBasicWeatherInfoItemsList = (weatherData: any) => {
  const {
    main: { pressure, humidity },
    wind: { speed },
    visibility,
  } = weatherData;
  return [
    [
      { fieldName: "Wind", fieldValue: `${speed}m/s` },
      { fieldName: "ESE", fieldValue: `${pressure}hPa` },
    ],
    [
      { fieldName: "Humidity", fieldValue: `${humidity}%` },
      {
        fieldName: "Visibility",
        fieldValue: `${(visibility / 1000).toFixed(1)}km`,
      },
    ],
  ];
};

const getDetailedWeatherInfoItemsList = (weatherData: any) => {
  const {
    main: { temp_min, temp_max },
    sys: { sunrise, sunset },
  } = weatherData;
  return [
    [
      { fieldName: "Min", fieldValue: `${temp_min.toFixed()}°C` },
      { fieldName: "Max", fieldValue: `${temp_max.toFixed()}°C` },
    ],
    [
      {
        fieldName: "Sunrise",
        fieldValue: `${dayjs(sunrise * 1000).format("h:mm A (UTCZ)")}`,
      },
      {
        fieldName: "Sunset",
        fieldValue: `${dayjs(sunset * 1000).format("h:mm A (UTCZ)")}`,
      },
    ],
  ];
};

const WeatherInfo = ({ currentWeather, detailed = false }: any) => {
  let cityWeatherInfoItemsList = getBasicWeatherInfoItemsList(currentWeather);

  if (detailed) {
    cityWeatherInfoItemsList = cityWeatherInfoItemsList.concat(
      getDetailedWeatherInfoItemsList(currentWeather)
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      {cityWeatherInfoItemsList.map((list, index) => (
        <Grid key={index} item>
          <Stack spacing={0.5}>
            {list.map((item) => (
              <BoldFieldValueText
                key={item.fieldName}
                fieldName={item.fieldName}
                fieldValue={item.fieldValue}
                fieldProps={{
                  variant: "body1",
                }}
              />
            ))}
          </Stack>
        </Grid>
      ))}
      <Grid item />
    </Grid>
  );
};

export default WeatherInfo;
