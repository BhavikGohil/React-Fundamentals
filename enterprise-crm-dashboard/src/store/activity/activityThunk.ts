import { createAsyncThunk } from "@reduxjs/toolkit";
import { activityService } from "../../services/activityService";
import type { ActivityFormValues } from "../../types/activityTypes";

export const fetchActivitiesByCustomerId = createAsyncThunk(
  "activity/fetchActivitiesByCustomerId",
  async (customerId: string, { rejectWithValue }) => {
    try {
      return await activityService.getByCustomerId(customerId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addActivity = createAsyncThunk(
  "activity/addActivity",
  async (
    payload: { customerId: string; values: ActivityFormValues },
    { rejectWithValue }
  ) => {
    try {
      return await activityService.create(payload.customerId, payload.values);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);