import { createSlice } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "../../types/authTypes";
import { loginUser, refreshUserToken } from "./authThunk";

const getStoredUser = (): AuthUser | null => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
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
      state.refreshToken = null;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    clearAuthError: (state) => {
      state.error = null;
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
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("token", action.payload.refreshToken);
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })

      .addCase(refreshUserToken.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload as string;

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout,clearAuthError } = authSlice.actions;

export default authSlice.reducer;
