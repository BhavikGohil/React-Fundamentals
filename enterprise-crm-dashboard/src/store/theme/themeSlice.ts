import { createSlice } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

const initialState: ThemeState = {
  mode: savedTheme || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);

      if (state.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    applyTheme: (state) => {
      if (state.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, applyTheme } = themeSlice.actions;

export default themeSlice.reducer;