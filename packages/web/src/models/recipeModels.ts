export interface RecipeModel {
  name: string
  url: string
  summary: string
  ingredients: string[]
  directions: string[]
  prep?: string
  cook?: string
  servings?: number
  tags?: string[]
  author?: {
    name: string
    url: string
  }
  source_url?: string
}
