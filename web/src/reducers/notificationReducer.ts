import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/types";

type NotificationState = Notification | null;
const initialState = null as NotificationState;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_state, action: PayloadAction<NotificationState>) {
      return action.payload;
    }
  }
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
