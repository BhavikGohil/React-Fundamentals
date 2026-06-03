import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CustomerState } from "../../types/customerTypes";
import {
  addCustomer,
  archiveCustomer,
  deleteCustomer,
  fetchCustomerById,
  fetchCustomers,
  restoreCustomer,
  updateCustomer,
} from "./customerThunk";

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
  searchTerm: "",
  statusFilter: "all",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<"all" | "active" | "inactive">
    ) => {
      state.statusFilter = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    clearCustomerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }

        state.selectedCustomer = action.payload;
      })

      .addCase(archiveCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }

        state.selectedCustomer = action.payload;
      })

      .addCase(restoreCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (customer) => customer.id === action.payload.id
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }

        state.selectedCustomer = action.payload;
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      });
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  clearSelectedCustomer,
  clearCustomerError,
} = customerSlice.actions;

export default customerSlice.reducer;