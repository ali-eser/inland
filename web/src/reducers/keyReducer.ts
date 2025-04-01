import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type KeyState = CryptoKey | null;
const initialState = null as KeyState;

const masterKeySlice = createSlice({
  name: "masterKey",
  initialState,
  reducers: {
    setMasterKey(_state, action: PayloadAction<KeyState>): KeyState {
      return action.payload;
    }
  }
});

export const { setMasterKey } = masterKeySlice.actions;

export default masterKeySlice.reducer;
