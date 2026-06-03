export type ActivityType = "call" | "meeting" | "email" | "note";

export interface Activity {
  id: string;
  customerId: string;
  type: ActivityType;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface ActivityFormValues {
  type: ActivityType;
  title: string;
  description: string;
}

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}