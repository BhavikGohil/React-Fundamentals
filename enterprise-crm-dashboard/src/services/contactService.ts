import type { ContactFormValues } from "../types/contactTypes";
import { supabase } from "./supabaseClient";
import { mapContact } from "./supabaseMappers";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const contactService = {
  getByCustomerId: async (customerId: string) => {
    const { data, error } = await supabase.from("contacts").select("*").eq("customer_id", customerId);
    throwIfError(error);
    return (data || []).map(mapContact);
  },

  create: async (customerId: string, values: ContactFormValues) => {
    const { data, error } = await supabase
      .from("contacts")
      .insert({ customer_id: customerId, name: values.name, email: values.email, phone: values.phone, type: values.type })
      .select()
      .single();

    throwIfError(error);
    return mapContact(data);
  },

  remove: async (id: string) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    throwIfError(error);
    return id;
  },
};