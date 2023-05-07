import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CityId } from "../../types";

export const selectSlice = (state: RootState) => {
  return state.cities;
};

export const selectCitiesIds = createDraftSafeSelector(
  selectSlice,
  (state) => state.allIds
);

export const selectCityById = (id: CityId) =>
  createDraftSafeSelector(selectSlice, (state) => state[id]);

export const selectCitiesFetchStatus = createDraftSafeSelector(
  selectSlice,
  (state) => state.status
);
