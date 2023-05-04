import { memo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { getCity, getCurrentWeather } from "../../api";
import { useParams } from "react-router-dom";

const CityWeatherDetails = () => {
  const [startFetch, setStartFetch] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["city", id],
    queryFn: () => getCity(id!),
    retry: 2,
    enabled: !!id && startFetch,
  });
  const { longitude, latitude } = data?.data || {};
  const { data: weatherData, isLoading: isWeatherDataLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["weather", longitude, latitude],
    queryFn: () => getCurrentWeather(longitude!, latitude!),
    retry: 2,
    enabled: !!longitude && !!latitude,
  });

  // Due to API restrictions, postpone a city fetching
  useEffect(() => {
    const timer = setTimeout(() => setStartFetch(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) return <CircularProgress />;
  if (isError) return <>Ooops</>;
  return <>Hello</>;
};

export default memo(CityWeatherDetails);
