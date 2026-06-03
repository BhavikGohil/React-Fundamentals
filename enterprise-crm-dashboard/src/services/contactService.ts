import api from "./api";
import type { Contact, ContactFormValues } from "../types/contactTypes";

export const contactService = {
  getByCustomerId: async (customerId: string) => {
    const response = await api.get<Contact[]>(
      `/contacts?customerId=${customerId}`
    );

    return response.data;
  },

  create: async (customerId: string, values: ContactFormValues) => {
    const response = await api.post<Contact>("/contacts", {
      ...values,
      customerId,
    });

    return response.data;
  },

  remove: async (id: string) => {
    await api.delete(`/contacts/${id}`);
    return id;
  },
};