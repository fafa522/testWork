import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { apiService } from "./service/api";

export const store = configureStore({
  reducer: combineSlices(apiService),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
