import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Customer, CustomerFormValues } from "../../types/customerTypes";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Customer[]>("/customers");
      return response.data;
    } catch {
      return rejectWithValue("Failed to fetch customers");
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Customer>(`/customers/${id}`);
      return response.data;
    } catch {
      return rejectWithValue("Failed to fetch customer details");
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (customer: CustomerFormValues, { rejectWithValue }) => {
    try {
      const response = await api.post<Customer>("/customers", customer);
      return response.data;
    } catch {
      return rejectWithValue("Failed to add customer");
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (customer: Customer, { rejectWithValue }) => {
    try {
      const response = await api.put<Customer>(
        `/customers/${customer.id}`,
        customer
      );
      return response.data;
    } catch {
      return rejectWithValue("Failed to update customer");
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`);
      return id;
    } catch {
      return rejectWithValue("Failed to delete customer");
    }
  }
);