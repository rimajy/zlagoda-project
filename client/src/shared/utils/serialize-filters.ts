/**
 * Serializes filters object to put into useQuery queryKey
 * to avoid unnecessary requests to a server
 */

export const serializeFilters = (filters?: Record<string, any>): string | null => {
  if (filters === undefined) {
    return '{}';
  }
  return JSON.stringify(filters, (_key, value) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  })
}