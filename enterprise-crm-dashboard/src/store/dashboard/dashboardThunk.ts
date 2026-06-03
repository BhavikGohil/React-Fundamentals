import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardService } from "../../services/dashboardService";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getStats();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDashboardRecentActivities = createAsyncThunk(
  "dashboard/fetchDashboardRecentActivities",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getRecentActivities();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);