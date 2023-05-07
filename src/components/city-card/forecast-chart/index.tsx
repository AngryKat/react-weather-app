import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

import ForecastChartError from "./forecast-chart-error";
import { getForecast } from "../../../api";
import { Coords } from "../../../types";

const transformData = (data: any[]) => {
  return data.map((item) => {
    const {
      dt_txt,
      main: { temp, ...restMain },
      ...rest
    } = item;
    return {
      dt_txt: dt_txt.split(" ")[1],
      main: { temp: temp.toFixed(), ...restMain },
      ...rest,
    };
  });
};

const ForecastChart = ({
  coords,
}: {
  coords: Coords;
}) => {
  const {
    data: forecastData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["forecast", coords],
    queryFn: () => getForecast(coords),
    enabled: !!coords,
  });

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Box
        width={730}
        height={250}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <ForecastChartError onRetry={handleRetry} />;
  }

  const transformedForecastData = transformData(forecastData.list);

  return (
    <AreaChart
      width={730}
      height={250}
      data={transformedForecastData}
      margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
    >
      <defs>
        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffa733" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ffa733" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="dt_txt" />
      <YAxis
        hide
        domain={[
          (dataMin: number) => Math.min(dataMin, 0),
          (dataMax: number) => dataMax + 5,
        ]}
        allowDataOverflow
      />
      <Tooltip />
      <Area
        label={{
          position: "insideBottom",
        }}
        type="monotone"
        dataKey="main.temp"
        stroke="#ffa733"
        fillOpacity={1}
        fill="url(#colorTemp)"
        name="Temperature"
        unit="°C"
      />
    </AreaChart>
  );
};

export default ForecastChart;
