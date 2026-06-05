import type { CustomerStatus } from "./customerTypes";
import type { ContactType } from "./contactTypes";
import type { ActivityType } from "./activityTypes";

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  is_archived: boolean;
  revenue: number;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface ContactRow {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
}

export interface ActivityRow {
  id: string;
  customer_id: string;
  type: ActivityType;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLogRow {
  id: string;
  action: string;
  entity: string;
  entity_id: string;
  created_by: string;
  created_at: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}