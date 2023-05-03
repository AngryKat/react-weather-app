import { useParams } from "react-router-dom";

const CityForecast = () => {
  const params = useParams();
  console.log("aaa ", { params });
  return <>Hello!</>;
};

export default CityForecast;
