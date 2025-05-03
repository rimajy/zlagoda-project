import { useEffect, useState } from 'react'

export function useDebounce<T>(term: T, delay: number): T{
  const [value, setValue] = useState<T>(term)

  useEffect(() => {
    const timeout = setTimeout(() => setValue(term), delay);
    return () => clearTimeout(timeout)
  }, [term])

  return value;
}