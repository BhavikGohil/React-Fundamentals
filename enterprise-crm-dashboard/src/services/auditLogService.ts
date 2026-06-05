import type { AuditLog } from "../types/auditLogTypes";
import { supabase } from "./supabaseClient";
import { mapAuditLog } from "./supabaseMappers";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const auditLogService = {
  getAll: async () => {
    const { data, error } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false });
    throwIfError(error);
    return (data || []).map(mapAuditLog);
  },

  create: async (log: Omit<AuditLog, "id" | "createdAt" | "createdBy">) => {
    const { data, error } = await supabase
      .from("audit_logs")
      .insert({ action: log.action, entity: log.entity, entity_id: log.entityId, created_by: "Admin" })
      .select()
      .single();

    throwIfError(error);
    return mapAuditLog(data);
  },
};