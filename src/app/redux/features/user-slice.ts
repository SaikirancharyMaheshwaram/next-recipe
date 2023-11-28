import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  user: {
    _id: string;
    username: string;
    email: string;
    image: string;
    location: string;
    occupation: string;
    friendsList: Array<string>;
    profileCount: number;
  };
  randomUser: {
    _id: string;
    username: string;
    email: string;
    image: string;
    location: string;
    occupation: string;
    friendsList: Array<string>;
    profileCount: number;
  };
};
const initialState: InitialState = {
  user: {
    _id: "",
    username: "",
    email: "",
    image: "",
    location: "",
    occupation: "",
    friendsList: [],
    profileCount: 0,
  },
  randomUser: {
    _id: "",
    username: "",
    email: "",
    image: "",
    location: "",
    occupation: "",
    friendsList: [],
    profileCount: 0,
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      return;
    },
    setFriends: (state, action: PayloadAction<any>) => {
      state.user.friendsList = action.payload;
      return;
    },
    setLoginUser: (state, action: PayloadAction<any>) => {
      state.randomUser = action.payload;
      return;
    },
  },
});

export const { setUser, setFriends, setLoginUser } = user.actions;
export default user.reducer;
