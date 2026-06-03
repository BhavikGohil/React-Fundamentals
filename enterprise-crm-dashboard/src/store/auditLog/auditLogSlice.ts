import { createSlice } from "@reduxjs/toolkit";
import type { AuditLogState } from "../../types/auditLogTypes";
import { createAuditLog, fetchAuditLogs } from "./auditLogThunk";

const initialState: AuditLogState = {
  auditLogs: [],
  loading: false,
  error: null,
};

const auditLogSlice = createSlice({
  name: "auditLog",
  initialState,
  reducers: {
    clearAuditLogs: (state) => {
      state.auditLogs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.auditLogs = action.payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createAuditLog.fulfilled, (state, action) => {
        state.auditLogs.unshift(action.payload);
      });
  },
});

export const { clearAuditLogs } = auditLogSlice.actions;

export default auditLogSlice.reducer;