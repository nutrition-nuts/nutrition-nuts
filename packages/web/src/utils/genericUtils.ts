export const getInputFieldValue = (e: React.FormEvent<HTMLInputElement>) =>
  (e.target as HTMLInputElement).value
