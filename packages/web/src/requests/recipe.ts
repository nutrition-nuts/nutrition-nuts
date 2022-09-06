import {get} from './requests'

export const getRecipe = async () => {
  return await get('/recipes');
}
