import { Box, Typography } from "@mui/material";

const Empty = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography variant="h4">No cities yet :c</Typography>
    <Typography variant="subtitle1">
      Search for a location above and add here!
    </Typography>
  </Box>
);

export default Empty;
