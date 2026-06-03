import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Customer, CustomerFormValues } from "../../types/customerTypes";
import { customerService } from "../../services/customerService";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      return await customerService.getAll();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await customerService.getById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customer: CustomerFormValues, { rejectWithValue }) => {
    try {
      return await customerService.create(customer);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (customer: Customer, { rejectWithValue }) => {
    try {
      return await customerService.update(customer);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const archiveCustomer = createAsyncThunk(
  "customer/archiveCustomer",
  async (customer: Customer, { rejectWithValue }) => {
    try {
      return await customerService.archive(customer);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const restoreCustomer = createAsyncThunk(
  "customer/restoreCustomer",
  async (customer: Customer, { rejectWithValue }) => {
    try {
      return await customerService.restore(customer);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id: string, { rejectWithValue }) => {
    try {
      return await customerService.remove(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
