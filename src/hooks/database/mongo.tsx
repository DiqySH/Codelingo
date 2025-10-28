import { useEffect, useState } from "react";
import { AdminData, Level, UpdateLevel } from "@/types";
import axios from "axios";

export const useGetLevels = (apiUrl: string) => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchLevels = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Level[]>(apiUrl);
        if (mounted) setLevels(data);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchLevels();

    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  return { levels, isLoading, error };
};

export const updateLevel = async (
  apiUrl: string,
  id: number | string,
  data: UpdateLevel
) => {
  try {
    await axios.put(apiUrl + "/" + id, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Admins
export const useGetAdmins = (apiUrl: string) => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [reFetch, setReFetch] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAdmins = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<AdminData[]>(apiUrl);
        if (mounted) setAdmins(data);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchAdmins();

    return () => {
      mounted = false;
    };
  }, [apiUrl, reFetch]);

  return { admins, isLoading, error, reFetch, setReFetch };
};

export const createAdmin = async (apiUrl: string, data: { email: string }) => {
  try {
    await axios.post(apiUrl, data);
  } catch (err) {
    console.error(err);
  }
};

export const deleteAdmin = async (apiUrl: string, id: string) => {
  try {
    await axios.delete(apiUrl + "/" + id);
  } catch (err) {
    console.error(err);
  }
};
