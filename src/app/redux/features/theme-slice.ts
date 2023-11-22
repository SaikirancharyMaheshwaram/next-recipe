import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  theme: string;
  posts: Array<any>;
};
const initialState: InitialState = {
  theme: "luxury",
  posts: [],
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      return;
    },
    setThemePosts: (state, action: PayloadAction<any>) => {
      state.posts = action.payload;
      return;
    },
  },
});

export const { setTheme ,setThemePosts} = theme.actions;
export default theme.reducer;
