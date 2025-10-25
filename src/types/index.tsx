import { loginSchema, registerSchema } from "@/schemas";
import React from "react";
import z from "zod";

export type LoginFormInputs = z.infer<typeof loginSchema>;

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export type FirebaseValue =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any> | string | number | boolean | null;

export type CreateValueResult<T = FirebaseValue> = {
  pushValue: (path: string, value: T) => Promise<void>;
  setValue: (path: string, value: T) => Promise<void>;
  error: string | null;
  success: boolean;
  loading: boolean;
  data: React.RefObject<{ key: string | null; value: T | null } | null>;
};

export type RealtimeValueResult<T = FirebaseValue> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
};

export type LevelObject = {
  answer: string;
  question: string;
  defaultCode: string;
};
