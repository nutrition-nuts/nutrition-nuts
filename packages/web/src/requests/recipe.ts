import { post } from './requests'
import { RecipeModel } from '../models/recipeModels'

export const getRecipes = async(
  query: string,
  allergies: string[],
  page: number
) => {
  const res = await post('/recipes', { query, allergies, page })
  const recipes: RecipeModel[] = JSON.parse(JSON.stringify(res.data[0]))
  return {
    recipes,
    foundStuff: Boolean(res.data[1]),
    hasMorePages: Boolean(res.data[2])
  }
}
