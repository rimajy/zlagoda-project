export const debounce = function (func: Function, wait: number) {
  let timeout: NodeJS.Timeout | undefined

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = undefined
      func.apply(null, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
