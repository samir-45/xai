import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./features/heroSlice";
import uiReducer from "./features/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      hero: heroReducer,
      ui: uiReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
