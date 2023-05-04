import { CircularProgress, Container, CssBaseline } from "@mui/material";

import "./App.css";

import { Outlet } from "react-router-dom";
import { useAppSelector, useThunkDispatch } from "./store/hooks";
import { useEffect } from "react";
import { fetchAddedCities } from "./store/cities/thunks";
import { selectCitiesFetchStatus } from "./store/cities/selectors";
import { FetchStatus } from "./store/cities";

export const CitiesFetcher = ({ children }: any) => {
  const citiesFetchStatus = useAppSelector(selectCitiesFetchStatus);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (citiesFetchStatus === FetchStatus.idle) {
      dispatch(fetchAddedCities());
    }
  }, [dispatch, citiesFetchStatus]);
  if (citiesFetchStatus === FetchStatus.succeeded) {
    return <>{children}</>;
  }
  return <CircularProgress />;
};

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ height: "100%" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
