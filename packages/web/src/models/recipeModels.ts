export interface RecipeModel {
  name: string
  ingredients: string[]
}

export interface DailyRecipes {
  breakfast: RecipeModel
  lunch: RecipeModel
  dinner: RecipeModel
}
