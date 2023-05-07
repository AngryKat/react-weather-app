import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { invariant } from "../components/utils";
import CityCardDetailed from "../components/city-card/city-card-detailed";

const CityWeatherDetailsPage = () => {
  const { id } = useParams();
  invariant(id);

  return (
    <Stack alignItems="center" p={3} spacing={2} sx={{ height: "100%" }}>
      <CityCardDetailed id={+id} />
    </Stack>
  );
};

export default CityWeatherDetailsPage;
