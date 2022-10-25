export const getInputFieldValue = (e: React.FormEvent<HTMLInputElement>) =>
  (e.target as HTMLInputElement).value

export const getListFromLocalStorage = <T>(key: string) => {
  let res: T[] = []
  try {
    res = JSON.parse(localStorage.getItem('allergies') ?? '[]') as T[]
  } catch {
    console.log(`Unexpected JSON in localstorage key ${key}`)
  }
  return res
}
