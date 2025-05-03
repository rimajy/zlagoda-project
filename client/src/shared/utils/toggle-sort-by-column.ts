export const toggleSortByColumn = <T>(
  state: T,
  setState: (arg: T) => void,
  values: T[],
) => {
  return () => {
    const currentIndex = values.findIndex(value => value === state)
    const nextIndex = (currentIndex + 1) % values.length
    setState(values[nextIndex])
  }
}
