export const notEmpty = (value: string | null | undefined): value is string => {
  return value !== null && value !== undefined;
}
