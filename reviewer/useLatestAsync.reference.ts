// Reviewer-only reference. Do not distribute this file to candidates.
import { useCallback, useRef, useState } from "react";

export function useLatestAsync<TArgs extends unknown[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>,
) {
  const latestRequest = useRef(0);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      const requestId = ++latestRequest.current;
      setLoading(true);
      try {
        return await asyncFn(...args);
      } finally {
        if (requestId === latestRequest.current) setLoading(false);
      }
    },
    [asyncFn],
  );

  return { run, loading };
}
