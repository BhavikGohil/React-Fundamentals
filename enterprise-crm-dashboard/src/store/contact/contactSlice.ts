import { createSlice } from "@reduxjs/toolkit";
import type { ContactState } from "../../types/contactTypes";
import {
  addContact,
  deleteContact,
  fetchContactsByCustomerId,
} from "./contactThunk";

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContacts: (state) => {
      state.contacts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsByCustomerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsByCustomerId.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsByCustomerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

export const { clearContacts } = contactSlice.actions;

export default contactSlice.reducer;