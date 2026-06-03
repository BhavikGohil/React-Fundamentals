export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  isArchived: boolean;
  revenue: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  revenue: number;
}

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: "all" | CustomerStatus;
}