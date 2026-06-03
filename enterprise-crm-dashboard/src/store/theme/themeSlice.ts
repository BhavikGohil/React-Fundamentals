import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
};

const setDocumentTheme = (mode: ThemeMode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

setDocumentTheme(initialState.mode);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const nextMode = state.mode === "light" ? "dark" : "light";

      state.mode = nextMode;
      localStorage.setItem("theme", nextMode);
      setDocumentTheme(nextMode);
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
      setDocumentTheme(action.payload);
    },
    applyTheme: (state) => {
      setDocumentTheme(state.mode);
    },
  },
});

export const { toggleTheme, setTheme, applyTheme } = themeSlice.actions;

export default themeSlice.reducer;