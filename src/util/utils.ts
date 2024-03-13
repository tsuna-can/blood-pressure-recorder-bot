export const isNumber = (value: string): boolean => {
  return !Number.isNaN(Number(value))
}
