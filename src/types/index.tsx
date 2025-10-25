import { loginSchema, registerSchema } from "@/schemas";
import z from "zod";

export type LoginFormInputs = z.infer<typeof loginSchema>;

export type RegisterFormInputs = z.infer<typeof registerSchema>;
