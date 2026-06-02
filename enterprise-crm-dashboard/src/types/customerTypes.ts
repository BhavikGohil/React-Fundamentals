export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
}

export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
}

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: "all" | CustomerStatus;
}