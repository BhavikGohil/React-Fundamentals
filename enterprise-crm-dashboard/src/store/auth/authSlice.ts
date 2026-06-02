import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/authTypes";
import { loginUser } from "./authThunk";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error=action.payload as string;
      });
  },
});

export const {logout} =authSlice.actions;

export default authSlice.reducer;
