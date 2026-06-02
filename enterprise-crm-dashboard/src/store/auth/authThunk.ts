import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload } from "../../types/authTypes";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (payload.email === "admin@test.com" && payload.password === "123456") {
      return {
        user: {
          id: "1",
          name: "Admin",
          email: payload.email,
        },
        token:"fake-jwt-token",
      };
    }
    return rejectWithValue("Invalid email or paddword");
  },
);
