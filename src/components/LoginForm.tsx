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
import { loginSchema } from "@/schemas";
import { LoginFormInputs } from "@/types";
import { SignIn, SignInWithGoogle } from "@/services/firebase";
import { AuthError } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    setLoading(true);
    const { email, password } = data;
    try {
      await SignIn(email, password);
    } catch (error) {
      const err = error as AuthError;
      switch (err.code) {
        case "auth/invalid-credential":
          setError("email", { message: "Wrong email or password" });
          setError("password", { message: "Wrong email or password" });
          break;

        default:
          setError("email", { message: "Something went wrong" });
          setError("password", { message: "Something went wrong" });
          break;
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await SignInWithGoogle();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleLogin)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
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
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="/google-icon.svg" alt="" className="w-6 h-6" />
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a
              className="underline underline-offset-4"
              onClick={() => navigate("/register")}
            >
              Register
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
