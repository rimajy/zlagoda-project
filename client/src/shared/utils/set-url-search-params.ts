export const setUrlSearchParams = (url: URL, params: Record<string, unknown>) => {
  for (const [key, value] of Object.entries(params)) {
    if (
      value === undefined ||
      typeof value === 'function' ||
      (typeof value === 'string' && value.trim() === '')
    ) continue;
    url.searchParams.set(key, String(value))
  }
}
