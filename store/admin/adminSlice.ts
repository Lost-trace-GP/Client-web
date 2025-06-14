import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, TLoading, Role } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Thunk to fetch all users
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string; state: { auth: { token: string | null } } }
>("admin/fetchAllUsers", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;

    const response = await axios.get(`${API_URL}/api/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    return response.data.data.users;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch users"
    );
  }
});

// Thunk to delete a user
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: { auth: { token: string | null } } }
>("admin/deleteUser", async (userId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;

    await axios.delete(`${API_URL}/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });

    return userId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete user"
    );
  }
});

// Promote a user to ADMIN
export const promoteUser = createAsyncThunk<
  string, // user ID
  string, // user ID
  { rejectValue: string; state: { auth: { token: string | null } } }
>("admin/promoteUser", async (userId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;

    await axios.put(
      `${API_URL}/api/admin/users/${userId}`,
      { role: Role.ADMIN },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    return userId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to promote user"
    );
  }
});

// Demote a user to USER
export const demoteUser = createAsyncThunk<
  { id: string; role: Role }, // success return type
  string, // userId
  { rejectValue: string; state: { auth: { token: string | null } } }
>(
  "admin/demoteUser",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.put(
        `${API_URL}/api/admin/users/${userId}/demote`,
        { role: Role.USER },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      return res.data.data; // { id, role }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to demote user"
      );
    }
  }
);


interface AdminState {
  users: User[];
  loading: TLoading;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  loading: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unknown error";
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // Promote user
      .addCase(
        promoteUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.users = state.users.map((user) =>
            user.id === action.payload ? { ...user, role: Role.ADMIN } : user
          );
        }
      )

      // Demote user
      .addCase(demoteUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, role: action.payload.role }
            : user
        );
      });
  },
});

export default adminSlice.reducer;
