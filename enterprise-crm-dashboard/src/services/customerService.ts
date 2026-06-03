import type { Customer, CustomerFormValues } from "../types/customerTypes";
import api from "./api";

export const customerService = {
  
  getAll: async () => {
    const response = await api.get<Customer[]>("/customers");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  create: async (customer: CustomerFormValues) => {
    const now = new Date().toISOString();

    const response = await api.post<Customer>("/customers", {
      ...customer,
      isArchived: false,
      createdBy: "Admin",
      updatedBy: "Admin",
      createdAt: now,
      updatedAt: now,
    });

    return response.data;
  },

  update: async (customer: Customer) => {
    const now = new Date().toISOString();
    const response = await api.put<Customer>(`/customers/${customer.id}`, {
      ...customer,
      updatedBy: "Admin",
      updatedAt: now,
    });

    return response.data;
  },

  archive: async (customer: Customer) => {
    const now = new Date().toISOString();
    const response = await api.patch<Customer>(`/customers/${customer.id}`, {
      isArchived: true,
      updatedBy: "Admin",
      updatedAt: now,
    });

    return response.data;
  },

  restore: async (customer: Customer) => {
    const now = new Date().toISOString();
    const response = await api.patch<Customer>(`/customers/${customer.id}`, {
      isArchived: false,
      updatedBy: "Admin",
      updatedAt: now,
    });

    return response.data;
  },

  remove: async (id: string) => {
    await api.delete(`/customers/${id}`);
    return id;
  },
};