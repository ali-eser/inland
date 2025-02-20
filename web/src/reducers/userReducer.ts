import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types";

const initialState = null as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserState>): UserState {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
