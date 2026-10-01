/**
 * STAGE 1 — Debug the search bug (10 minutes).
 * Fix this hook so older requests cannot replace the latest search results
 * or change its loading state. Keep { run, loading } and generic types.
 * Use the provided tests; the implementation below is intentionally buggy.
 */
import { useCallback, useState } from "react";

export function useLatestAsync<TArgs extends unknown[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setLoading(true);

      try {
        const result = await asyncFn(...args);
        return result;
      } finally {
        setLoading(false);
      }
    },
    [asyncFn]
  );
  return { run, loading };
}
