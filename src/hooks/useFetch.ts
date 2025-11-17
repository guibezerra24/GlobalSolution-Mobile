// src/hooks/useFetch.ts
import { useCallback, useEffect, useState } from 'react';

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await fetcher();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      console.error(err);
      setState({
        data: null,
        loading: false,
        error: 'Não foi possível carregar os dados. Tente novamente.',
      });
    }
  }, deps);

  useEffect(() => {
    void execute();
  }, [execute]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch: execute,
  };
}
