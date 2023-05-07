import { Button, Typography, Box } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

const ForecastChartError = ({ onRetry }: { onRetry: () => void }) => (
  <Box
    width={730}
    height={250}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ErrorOutlineIcon />
    <Typography>Error while loading forecast</Typography>
    <Button endIcon={<RefreshIcon />} onClick={onRetry}>
      Reload
    </Button>
  </Box>
);

export default ForecastChartError;
