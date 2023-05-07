import { ReactNode, useEffect } from "react";
import { useAppSelector, useThunkDispatch } from "../../store/hooks";
import { fetchAddedCities } from "../../store/cities/thunks";
import { selectCitiesFetchStatus } from "../../store/cities/selectors";
import { FetchStatus } from "../../types";

export const InitAppData = ({ children }: { children: ReactNode }) => {
    const citiesFetchStatus = useAppSelector(selectCitiesFetchStatus);
    const dispatch = useThunkDispatch();
  
    useEffect(() => {
      if (citiesFetchStatus === FetchStatus.idle) {
        dispatch(fetchAddedCities());
      }
    }, [dispatch, citiesFetchStatus]);
  
    if (citiesFetchStatus === FetchStatus.failed) {
      throw new Error("Failed initialize project");
    }
    return <>{children}</>;
  };
  