import * as z from "zod";

export type RegisterForm = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  email: z.string(),
  fullName: z.string(),
  password: z.string(),
});
