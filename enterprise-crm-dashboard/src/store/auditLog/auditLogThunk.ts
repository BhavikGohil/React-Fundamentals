import { createAsyncThunk } from "@reduxjs/toolkit";
import { auditLogService } from "../../services/auditLogService";
import type { AuditLog } from "../../types/auditLogTypes";

export const fetchAuditLogs = createAsyncThunk(
  "auditLog/fetchAuditLogs",
  async (_, { rejectWithValue }) => {
    try {
      return await auditLogService.getAll();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAuditLog = createAsyncThunk(
  "auditLog/createAuditLog",
  async (
    log: Omit<AuditLog, "id" | "createdAt" | "createdBy">,
    { rejectWithValue }
  ) => {
    try {
      return await auditLogService.create(log);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);