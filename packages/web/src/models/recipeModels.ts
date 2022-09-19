export interface RecipeModel {
  title: string
  description: string
  ingredients: string[]
  directions: string[]
  prep_time_min?: string
  cook_time_min?: string
  servings?: number
  tags?: string[]
  author?: {
    name: string
    url: string
  }
  source_url?: string
}
