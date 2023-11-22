import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./features/recipe-slice";
import userSlice from "./features/user-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    recipeSlice,
    userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
