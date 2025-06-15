import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Report } from "@/types/report";
import { TLoading } from "@/types";
import { RootState } from "../index";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Thunks
export const fetchReports = createAsyncThunk<
  Report[],
  void,
  { state: RootState }
>("reports/fetchAll", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/api/report`, {
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
      throw new Error(errorData.message || "Failed to fetch reports");
    }

    const data = await response.json();
    console.log("Reports data:", data.data.reports);
    return data.data.reports;
  } catch (error) {
    console.error("Fetch reports error:", error);
    throw error;
  }
});

export const createReport = createAsyncThunk<
  Report,
  FormData,
  { state: RootState }
>("report/create", async (formData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${API_URL}/api/report`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Create report response:", response.data);

    // 🔧 Adjust depending on what your backend actually returns
    return response.data.data as Report;
  } catch (error: any) {
    console.error(
      "Create report error:",
      error.response?.data || error.message
    );
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create report";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});



// fetch user reports 
export const fetchUserReports = createAsyncThunk<
  Report[],
  void,
  { state: RootState }
>("reports/fetchUserReports", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/api/report/user`, {
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
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      throw new Error(errorData.message || "Failed to fetch user reports");
    }

    const data = await response.json();
    console.log("User reports data:", data.data.reports);
    return data.data.reports as Report[];
  } catch (error) {
    console.error("Fetch user reports error:", error);
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch user reports"
    );
  }
});


//  fetch report by id 
export const fetchReportById = createAsyncThunk<
  Report,
  string,
  { state: RootState }
>("report/fetchById", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/api/report/${id}`, {
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
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      throw new Error(errorData.message || "Failed to fetch report");
    }

    const data = await response.json();
    console.log("Fetched report by ID:", data.data.report);
    return data.data.report as Report;
  } catch (error) {
    console.error("Fetch report by ID error:", error);
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch report"
    );
  }
});


// Delete a report
export const deleteReport = createAsyncThunk<
  string, // Return type
  string, // Argument type (report ID)
  { state: RootState }
>("reports/delete", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await fetch(`${API_URL}/api/report/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      throw new Error(errorData.message || "Failed to delete report");
    }

    return id;
  } catch (error) {
    console.error("Delete report error:", error);
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Failed to delete report"
    );
  }
});

//  edit a report 
export const updateReport = createAsyncThunk<
  Report,
  { id: string; formData: FormData },
  { state: RootState }
>("reports/update", async ({ id, formData }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    const response = await axios.patch(`${API_URL}/api/report/${id}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true",
      },
    });

    console.log("Updated report response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Update report error:",
      error.response?.data || error.message
    );
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update report"
    );
  }
});


// State & Slice
interface ReportState {
  reports: Report[];
  userReports: Report[];
  selectedReport: Report | null;
  loading: TLoading;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  userReports: [],
  selectedReport: null,
  loading: "idle",
  error: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
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

      // Create
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
        state.error = action.payload as string;
      })

      // Delete a report
      .addCase(
        deleteReport.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.reports = state.reports.filter((r) => r.id !== action.payload);
        }
      )
      .addCase(deleteReport.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })

      // Fetch User Reports
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
        state.error = action.payload as string;
      })

      // Fetch Report By ID
      .addCase(fetchReportById.pending, (state) => {
        state.loading = "loading";
        state.error = null;
        state.selectedReport = null;
      })
      .addCase(
        fetchReportById.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.loading = "succeeded";
          state.selectedReport = action.payload;
        }
      )
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
        state.selectedReport = null;
      })
      // Update a report
.addCase(updateReport.pending, (state) => {
  state.loading = "loading";
  state.error = null;
})
.addCase(updateReport.fulfilled, (state, action: PayloadAction<Report>) => {
  state.loading = "succeeded";

  // Update in reports list
  state.reports = state.reports.map((r) =>
    r.id === action.payload.id ? action.payload : r
  );

  // Update in userReports list
  state.userReports = state.userReports.map((r) =>
    r.id === action.payload.id ? action.payload : r
  );
})
.addCase(updateReport.rejected, (state, action) => {
  state.loading = "failed";
  state.error = action.payload as string;
});
      
  },
});

export default reportSlice.reducer;
