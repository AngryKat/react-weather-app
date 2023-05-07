import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Button, Stack, Box } from "@mui/material";

const CityCardError = ({
  onRetry,
  gridCard = false,
}: {
  onRetry: () => void;
  gridCard?: boolean;
}) => {
  return (
    <Box
      width={gridCard ? "360px" : "720px"}
      height={356}
      sx={{
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
        <SentimentVeryDissatisfied />
        <div>Error occurred</div>
        <Button onClick={onRetry}>Retry</Button>
      </Stack>
    </Box>
  );
};

export default CityCardError;
