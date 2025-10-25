import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { RegisterFormInputs } from "@/types";
import { SignUp } from "@/services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthError } from "firebase/auth";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormInputs) => {
    setLoading(true);
    const { email, password } = data;
    try {
      await SignUp(email, password);
    } catch (error) {
      const err = error as AuthError;
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("email", { message: "Email already in use" });
          break;

        default:
          break;
      }
    }
    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleRegister)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create account</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          </div>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            Register
          </Button>
        </Field>
        <FieldSeparator />
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <a
              className="underline underline-offset-4"
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
