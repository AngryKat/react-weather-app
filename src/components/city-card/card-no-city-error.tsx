import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CityCardNoCityError = () => {
  return (
    <Box
      width={720}
      height={356}
      sx={{
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
        <SentimentVeryDissatisfied />
        <div>There is no city with such id in the storage.</div>
        <div>
          Return to the <Link to="/">home page</Link> and add a city!
        </div>
      </Stack>
    </Box>
  );
};

export default CityCardNoCityError;
