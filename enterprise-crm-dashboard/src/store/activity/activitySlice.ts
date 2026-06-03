import { createSlice } from "@reduxjs/toolkit";
import type { ActivityState } from "../../types/activityTypes";
import {
  addActivity,
  fetchActivitiesByCustomerId,
} from "./activityThunk";

const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    clearActivities: (state) => {
      state.activities = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivitiesByCustomerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivitiesByCustomerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addActivity.fulfilled, (state, action) => {
        state.activities.unshift(action.payload);
      });
  },
});

export const { clearActivities } = activitySlice.actions;

export default activitySlice.reducer;