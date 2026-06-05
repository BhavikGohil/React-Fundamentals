import type { ActivityFormValues } from "../types/activityTypes";
import { supabase } from "./supabaseClient";
import { mapActivity } from "./supabaseMappers";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const activityService = {
  getByCustomerId: async (customerId: string) => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    throwIfError(error);
    return (data || []).map(mapActivity);
  },

  create: async (customerId: string, values: ActivityFormValues) => {
    const { data, error } = await supabase
      .from("activities")
      .insert({
        customer_id: customerId,
        type: values.type,
        title: values.title,
        description: values.description,
        created_by: "Admin",
      })
      .select()
      .single();

    throwIfError(error);
    return mapActivity(data);
  },
};