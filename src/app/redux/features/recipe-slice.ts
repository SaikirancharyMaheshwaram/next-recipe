import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  posts: [{ _id: "" }],
  count: 0,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any>) => {
      state.posts = action.payload;
    },
    setPost: (state, action: PayloadAction<any>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});
export const { setPost, setPosts, setCount } = recipeSlice.actions;
export default recipeSlice.reducer;
