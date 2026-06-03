export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  createdBy: string;
  createdAt: string;
}

export interface AuditLogState {
  auditLogs: AuditLog[];
  loading: boolean;
  error: string | null;
}