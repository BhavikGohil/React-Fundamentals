export type ContactType = "primary" | "billing" | "technical";

export interface Contact {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  type: ContactType;
}

export interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}
