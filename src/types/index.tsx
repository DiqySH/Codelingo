import { adminSchema, loginSchema, registerSchema } from "@/schemas";
import React from "react";
import z from "zod";
import { SetStateAction } from "react";

export type LoginFormInputs = z.infer<typeof loginSchema>;

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export type AdminFormInputs = z.infer<typeof adminSchema>;

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

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type Level = {
  levelIndex: string;
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UpdateLevel = {
  levelIndex: string;
  title: string;
  content: string;
};

export type LevelsProviderProps = {
  children: React.ReactNode;
};

export type AdminProviderProps = {
  children: React.ReactNode;
};

export type LevelsProviderState = {
  levels: Level[];
  isLoading: boolean;
  error: Error | null;
};

export type SidebarItem = {
  contents: {
    icon: React.ReactNode;
    text: string;
    url: string;
  }[];
  accounts: {
    icon: React.ReactNode;
    text: string;
    url: string;
  }[];
};

export type AdminData = {
  _id: string;
  email: string;
};

export type AdminsProviderState = {
  admins: AdminData[];
  isLoading: boolean;
  error: Error | null;
  reFetch: boolean;
  setReFetch: React.Dispatch<SetStateAction<boolean>>;
};

export type AdminsProviderProps = {
  children: React.ReactNode;
};
