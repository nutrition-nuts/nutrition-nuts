export type RecipeModel = {
  name: string;
  ingredients: string[];
}

export type DailyRecipes = {
  breakfast: RecipeModel;
  lunch: RecipeModel;
  dinner: RecipeModel;
}