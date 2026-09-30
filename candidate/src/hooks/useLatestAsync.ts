import { useCallback, useState } from "react"
export function useLatestAsync<TArgs extends unknown[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>
) {
  const [loading, setLoading] = useState(false)
  const run = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setLoading(true)
      try {
        const result = await asyncFn(...args)
        console.log('result', result)
        return result
      } finally {
        setLoading(false)
      }
    },
    [asyncFn]
  )
  return { run, loading }
}
