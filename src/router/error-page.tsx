import {
  Container,
  Stack,
  Typography,
  Box,
  Divider,
  styled,
} from "@mui/material";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const CenteredContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ErrorPage = () => {
  let error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <CenteredContainer>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h3">{error.status}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="subtitle1">{error.statusText}</Typography>
        </Stack>
      </CenteredContainer>
    );
  }

  return (
    <Container>
      <Box sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography>
          An error occurred. Consider returning to the <Link to="/">Home</Link>
          page
        </Typography>
      </Box>
    </Container>
  );
};
