import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
};
export const homestate = createSlice({
  name: "superstate",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user freinds non existenet");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload.post;
        return post;
      });
    },
  },
});
export const{setFriends,setLogin,setPost,setPosts}=homestate.actions;
export default homestate.reducer;
