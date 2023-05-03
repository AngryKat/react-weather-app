import { useParams, useSearchParams } from "react-router-dom";
import CityForecast from "../components/city-forecast/city-forecast";
import { useSelector } from "react-redux";
import { selectCityById } from "../store/cities-reducer/selectors";
import CityCard from "../components/city-card/city-card";

const WeatherDetails = () => {
  const [coords] = useSearchParams();
  console.log('aaa ', { d: coords.get("lat") });

  return (
    <>
      {/* <CityCard id={+id!} /> */}
      <CityForecast />
    </>
  );
};
export default WeatherDetails;
