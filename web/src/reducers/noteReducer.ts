import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@/types";

const initialState: Note[] = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(_state, action: PayloadAction<Note[]>): Note[] {
      return action.payload;
    }
  }
});

export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
