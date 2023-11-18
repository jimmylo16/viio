import * as z from "zod";

export type LoginForm = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
