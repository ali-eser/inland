import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@/types";

const initialState: Note[] = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>): void {
      state.push(...action.payload)
    }
  }
});

export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
