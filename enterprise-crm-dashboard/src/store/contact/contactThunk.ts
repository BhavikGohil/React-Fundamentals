import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "../../services/contactService";
import type { ContactFormValues } from "../../types/contactTypes";

export const fetchContactsByCustomerId = createAsyncThunk(
  "contact/fetchContactsByCustomerId",
  async (customerId: string, { rejectWithValue }) => {
    try {
      return await contactService.getByCustomerId(customerId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",
  async (
    payload: { customerId: string; values: ContactFormValues },
    { rejectWithValue }
  ) => {
    try {
      return await contactService.create(payload.customerId, payload.values);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id: string, { rejectWithValue }) => {
    try {
      return await contactService.remove(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);