import type { Customer, CustomerFormValues } from "../types/customerTypes";
import { mapCustomer, toCustomerRow } from "./supabaseMappers";
import { supabase } from "./supabaseClient";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const customerService = {
  getAll: async () => {
    const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    throwIfError(error);
    return (data || []).map(mapCustomer);
  },

  getById: async (id: string) => {
    const { data, error } = await supabase.from("customers").select("*").eq("id", id).single();
    throwIfError(error);
    return mapCustomer(data);
  },

  create: async (customer: CustomerFormValues) => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("customers")
      .insert(toCustomerRow({ ...customer, isArchived: false, createdBy: "Admin", updatedBy: "Admin", createdAt: now, updatedAt: now }))
      .select()
      .single();

    throwIfError(error);
    return mapCustomer(data);
  },

  update: async (customer: Customer) => {
    const { data, error } = await supabase
      .from("customers")
      .update(toCustomerRow({ ...customer, updatedBy: "Admin", updatedAt: new Date().toISOString() }))
      .eq("id", customer.id)
      .select()
      .single();

    throwIfError(error);
    return mapCustomer(data);
  },

  archive: async (customer: Customer) => {
    const { data, error } = await supabase
      .from("customers")
      .update({ is_archived: true, updated_by: "Admin", updated_at: new Date().toISOString() })
      .eq("id", customer.id)
      .select()
      .single();

    throwIfError(error);
    return mapCustomer(data);
  },

  restore: async (customer: Customer) => {
    const { data, error } = await supabase
      .from("customers")
      .update({ is_archived: false, updated_by: "Admin", updated_at: new Date().toISOString() })
      .eq("id", customer.id)
      .select()
      .single();

    throwIfError(error);
    return mapCustomer(data);
  },

  remove: async (id: string) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    throwIfError(error);
    return id;
  },
};