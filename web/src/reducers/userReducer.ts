import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

type UserState = User | null;
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
