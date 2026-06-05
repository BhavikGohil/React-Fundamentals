import type { Activity } from "../types/activityTypes";
import type { AuditLog } from "../types/auditLogTypes";
import type { Contact } from "../types/contactTypes";
import type { Customer } from "../types/customerTypes";
import type { AppNotification } from "../types/notificationTypes";

import type {
  ActivityRow,
  AuditLogRow,
  ContactRow,
  CustomerRow,
  NotificationRow,
} from "../types/commonTypes";

export const mapCustomer = (row: CustomerRow): Customer => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  status: row.status,
  isArchived: row.is_archived,
  revenue: Number(row.revenue ?? 0),
  createdBy: row.created_by,
  updatedBy: row.updated_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const toCustomerRow = (customer: Partial<Customer>) => ({
  name: customer.name,
  email: customer.email,
  phone: customer.phone,
  status: customer.status,
  is_archived: customer.isArchived,
  revenue: customer.revenue,
  created_by: customer.createdBy,
  updated_by: customer.updatedBy,
  created_at: customer.createdAt,
  updated_at: customer.updatedAt,
});

export const mapContact = (row: ContactRow): Contact => ({
  id: row.id,
  customer_id: row.customer_id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  type: row.type,
});

export const mapActivity = (row: ActivityRow): Activity => ({
  id: row.id,
  customerId: row.customer_id,
  type: row.type,
  title: row.title,
  description: row.description,
  createdBy: row.created_by,
  createdAt: row.created_at,
});

export const mapNotification = (
  row: NotificationRow
): AppNotification => ({
  id: row.id,
  title: row.title,
  message: row.message,
  isRead: row.is_read,
  createdAt: row.created_at,
});

export const mapAuditLog = (row: AuditLogRow): AuditLog => ({
  id: row.id,
  action: row.action,
  entity: row.entity,
  entityId: row.entity_id,
  createdBy: row.created_by,
  createdAt: row.created_at,
});