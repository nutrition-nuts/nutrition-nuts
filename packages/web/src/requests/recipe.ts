import { get } from './requests'
import { RecipeModel } from '../models/recipeModels'

export const getRecipes = async(query: string, allergies: string) => {
  const res = await get('/recipes', { query, allergies })
  const recipes: RecipeModel[] = JSON.parse(JSON.stringify(res.data[0]))
  return { recipes: recipes, found_stuff: Boolean(res.data[1]) }
}
