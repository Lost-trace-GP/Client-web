import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Report } from "@/types/report";
import { TLoading } from "@/types";
import { RootState } from "../index";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export const fetchReports = createAsyncThunk<
  Report[],
  void,
  { state: RootState }
>("reports/fetchAll", async (_, thunkAPI) => {
  
    const token = thunkAPI.getState().auth.token;

    try {
      const response = await fetch(`${API_URL}/report`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // handle non-2xx HTTP responses
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch reports");
      }
  
      const data = await response.json();
      console.log("Reports data:", data.data.reports); // assuming response shape
      return data.data.reports; // return reports array
    } catch (error) {
      console.error("Fetch reports error:", error);
      throw error; // or handle error accordingly
    }
});


export const createReport = createAsyncThunk<
  Report,
  FormData,
  { state: RootState }
>("report/create", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${API_URL}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.report as Report; // Adjust according to API
  } catch (error: any) {
    console.error("Create report error:", error.response?.data || error);
    return thunkAPI.rejectWithValue(error.response?.data || "Error");
  }
});

export const fetchUserReports = createAsyncThunk<
  Report[],
  void,
  { state: RootState }
>("reports/fetchUserReports", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.reports as Report[];
  } catch (error: any) {
    console.error("Fetch user reports error:", error.response?.data || error);
    return thunkAPI.rejectWithValue(error.response?.data || "Error");
  }
});

export const deleteReport = createAsyncThunk<string, string>(
  "reports/delete",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

interface ReportState {
  reports: Report[];
  loading: TLoading;
  error: string | null;
  userReports: Report[];
}

const initialState: ReportState = {
  reports: [],
  loading: "idle",
  error: null,
  userReports: [],
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        fetchReports.fulfilled,
        (state, action: PayloadAction<Report[]>) => {
          state.loading = "succeeded";
          state.reports = action.payload;
        }
      )
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch reports";
      })
      .addCase(createReport.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        createReport.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = "succeeded";
          state.reports.push(action.payload);
        }
      )
      .addCase(createReport.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to create report";
      })
      .addCase(
        deleteReport.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.reports = state.reports.filter((r) => r.id !== action.payload);
        }
      )
      .addCase(fetchUserReports.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(
        fetchUserReports.fulfilled,
        (state, action: PayloadAction<Report[]>) => {
          state.loading = "succeeded";
          state.userReports = action.payload;
        }
      )
      .addCase(fetchUserReports.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch user reports";
      });
  },
});

export default reportSlice.reducer;
