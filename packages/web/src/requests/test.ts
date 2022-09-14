import { get } from './requests'

export const getTest = async () => {
  return await get('/test')
}
