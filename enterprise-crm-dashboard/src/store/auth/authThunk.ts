import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload } from "../../types/authTypes";
import { authService } from "../../services/authServices";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
 async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.login(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const refreshUserToken = createAsyncThunk(
  "auth/refreshUserToken",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.refreshToken();
    } catch {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);
