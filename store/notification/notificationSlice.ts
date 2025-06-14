

// src/store/notification/notificationSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TLoading, Notification } from "@/types";
import { RootState } from "@/store";




const API_URL = process.env.NEXT_PUBLIC_API_URL;


// to fetch all notifications
export const fetchNotifications = createAsyncThunk<
  { notifications: Notification[]; unreadCount: number },
  void,
  { state: RootState }
>("notifications/fetchAll", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/api/notifications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch notifications");
    }

    const data = await response.json();
    return {
      notifications: data.data,
      unreadCount: data.unreadCount,
    };
  } catch (error) {
    console.error("Fetch notifications error:", error);
    throw error;
  }
});


// read the notification
export const markNotificationAsRead = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("notifications/markAsRead", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    await axios.put(
      `${API_URL}/api/notifications/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    return id;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to mark notification as read";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});



export const markAllNotificationsAsRead = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("notifications/markAllAsRead", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    await axios.put(
      `${API_URL}/api/notifications/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to mark all notifications as read";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// You can add markAllAsRead, deleteNotification, etc.

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: TLoading;
  error: string | null;

}

const initialState: NotificationState = {
  notifications: [],
  loading: "idle",
  error: null,
  unreadCount: 0
};
  

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .fetchNotifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? null;
      })
    //   .markNotificationAsRead
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const idx = state.notifications.findIndex(
          (n) => n.id === action.payload
        );
        if (idx !== -1) state.notifications[idx].isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          (action.payload as string) ?? action.error.message ?? "Unknown error";
      })

      //   .markAllNotificationsAsRead
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        state.unreadCount = 0;
      });
  },
});
export default notificationSlice.reducer;
