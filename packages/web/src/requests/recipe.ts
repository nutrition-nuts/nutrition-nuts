import { get } from "./requests";
import { RecipeModel } from "../models/recipeModels";

export const getRecipes = async (query: string) => {
  const res = await get(`/recipes`, { query: query });
  const recipes: RecipeModel[] = JSON.parse(JSON.stringify(res.data));
  return recipes;
};
