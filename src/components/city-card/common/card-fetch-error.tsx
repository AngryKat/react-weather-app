import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Button, Stack, Box } from "@mui/material";

const CityCardFetchError = ({
  onRetry,
  gridCard = false,
}: {
  onRetry: () => void;
  gridCard?: boolean;
}) => {
  return (
    <Box
      width={gridCard ? 380 : 720}
      height={356}
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.2)",
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

export default CityCardFetchError;
