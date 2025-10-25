import z from "zod";

const loginSchema = z.object({
  email: z
    .string("Email can't be empty!")
    .min(1, "Email can't be empty!")
    .pipe(z.email("Invalid email address!")),
  password: z
    .string()
    .min(1, "Password can't be empty!")
    .min(6, "Password should be at least 6 characters"),
});

const registerSchema = z
  .object({
    email: z
      .string("Email can't be empty!")
      .min(1, "Email can't be empty!")
      .pipe(z.email("Invalid email address!")),
    password: z
      .string()
      .min(1, "Password can't be empty!")
      .min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string().min(1, "You have to confirm the password!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password don't match",
    path: ["confirmPassword"],
  });

export { loginSchema, registerSchema };
