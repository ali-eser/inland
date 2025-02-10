import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { User } from "@/types";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    }
  }
});

export const { setUser } = userSlice.actions;

export const initUser = (user: User) => {
  return (dispatch: Dispatch) => {
    dispatch(setUser(user));
  }
};

export default userSlice.reducer;
