require("dotenv").config();

const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

async function run() {
  const db = JSON.parse(
    fs.readFileSync("./db.json", "utf8")
  );

  // Customers
  const customers = db.customers.map(c => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    status: c.status,
    is_archived: c.is_archived,
    revenue: c.revenue,
    created_by: c.createdBy,
    updated_by: c.updatedBy,
    created_at: c.createdAt,
    updated_at: c.updatedAt
  }));

  await supabase.from("customers").insert(customers);

  // Contacts
  const contacts = db.contacts.map(c => ({
    id: c.id,
    customer_id: c.customerId,
    name: c.name,
    email: c.email,
    phone: c.phone,
    type: c.type
  }));

  await supabase.from("contacts").insert(contacts);

  // Activities
  const activities = db.activities.map(a => ({
    id: a.id,
    customer_id: a.customerId,
    type: a.type,
    title: a.title,
    description: a.description,
    created_by: a.createdBy,
    created_at: a.createdAt
  }));

  await supabase.from("activities").insert(activities);

  // Notifications
  const notifications = db.notifications.map(n => ({
    id: n.id,
    title: n.title,
    message: n.message,
    is_read: n.isRead,
    created_at: n.createdAt
  }));

  await supabase.from("notifications").insert(notifications);

  // Audit Logs
  const auditLogs = db.auditLogs.map(a => ({
    id: a.id,
    action: a.action,
    entity: a.entity,
    entity_id: a.entityId,
    created_by: a.createdBy,
    created_at: a.createdAt
  }));

  await supabase.from("audit_logs").insert(auditLogs);

  console.log("Import completed successfully");
}

run();