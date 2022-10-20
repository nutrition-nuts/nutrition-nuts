import { get } from './requests'
import { RecipeModel } from '../models/recipeModels'

export const getRecipes = async (
  query: string,
  allergies: string,
  page: string
) => {
  const res = await get('/recipes', { query, allergies, page })
  const recipes: RecipeModel[] = JSON.parse(JSON.stringify(res.data[0]))
  return { recipes: recipes, foundStuff: Boolean(res.data[1]), hasMorePages: Boolean(res.data[2]) }
}
