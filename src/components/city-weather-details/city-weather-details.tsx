import { memo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Stack } from "@mui/material";
import { getCity, getCurrentWeather, getForecast } from "../../api";
import { useLoaderData, useParams } from "react-router-dom";
import CityCard from "../city-card/city-card";
import { useAppSelector } from "../../store/hooks";
import { selectCityById } from "../../store/cities/selectors";
import { CityId } from "../types";

const CityWeatherDetails = () => {
  const cityId = useLoaderData() as CityId;
  const hello = useAppSelector(selectCityById(cityId));

  // const [lat, lon] = coords.split(" ");
  // const { data: forecastData, isLoading } = useQuery({
  //   queryKey: ["forecast", lat, lon],
  //   queryFn: () => getForecast(lat!, lon!),
  //   retry: 2,
  //   enabled: !!lat && !!lon,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <Stack direction="row">
      <CityCard id={cityId} />
      {/* {!isLoading && <>Forecast</>} */}
    </Stack>
  );
};

export default memo(CityWeatherDetails);
