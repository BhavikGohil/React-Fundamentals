import { z } from "zod";

export const activitySchema = z.object({
  type: z.enum(["call", "meeting", "email", "note"]),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
});