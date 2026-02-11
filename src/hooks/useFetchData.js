import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

// Generic hook to fetch JSON from /data/ in public.
// Example: useFetchData('projects.json') -> GET /data/projects.json
export const useFetchData = (fileName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(fileName));
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (signal) => {
      if (!fileName) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/data/${fileName}`, {
          signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [fileName]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
};

