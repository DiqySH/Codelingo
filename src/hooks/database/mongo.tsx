import { useEffect, useState } from "react";
import { Level, UpdateLevel } from "@/types";
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
