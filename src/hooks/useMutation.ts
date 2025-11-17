// src/hooks/useMutation.ts
import { useState } from 'react';

type MutationFn<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

export function useMutation<TInput, TOutput>(
  mutationFn: MutationFn<TInput, TOutput>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    input: TInput,
    onSuccess?: (data: TOutput) => void,
    onError?: (message: string) => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await mutationFn(input);
      setLoading(false);
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      console.error(err);
      const message = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      setError(message);
      if (onError) {
        onError(message);
      }
      setLoading(false);
      throw err;
    }
  };

  return { mutate, loading, error };
}
