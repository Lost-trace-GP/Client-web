import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Role, TLoading } from "../../types";

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Async thunk for user registration
export const actAuthRegister = createAsyncThunk<
  { token: string; user: Partial<User> },
  { name: string; email: string; phone: string; password: string },
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    console.log(response.data.data);

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

// For auth endpoints, add ngrok headers to axios requests
export const login = createAsyncThunk<
  { token: string; user: Partial<User> },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    console.log("Login response:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Login failed";
    
    return rejectWithValue(errorMessage);
  }
});

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk<
  { message: string; resetToken: string },
  { email: string },
  { rejectValue: string }
>("auth/forgetPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/forget-password`, { email });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to send reset token"
    );
  }
});

// Async thunk for reset password
export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; newPassword: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ token, newPassword }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Password reset failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = "idle";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        actAuthRegister.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: Partial<User> }>
        ) => {
          state.loading = "succeeded";
          state.token = action.payload.token;
          state.user = action.payload.user; // ✅ Use actual user info from response
        }
      )
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: Partial<User> }>
        ) => {
          state.loading = "succeeded";
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, resetUI } = authSlice.actions;
export default authSlice.reducer;
