export interface RecipeModel extends NutrientInfoModel {
  name: string
  url: string
  category: string
  author: string
  summary: string
  rating: number
  rating_count: number
  review_count: number
  ingredients: string[]
  directions: string[]
  prep: string
  cook: string
  total: string
  yield: string
}

export interface NutrientInfoModel {
  servings: number
  calories: number
  carbohydrates_g: number
  sugars_g: number
  fat_g: number
  saturated_fat_g: number
  cholesterol_mg: number
  protein_g: number
  dietary_fiber_g: number
  sodium_mg: number
  calories_from_fat: number
  calcium_mg: number
  iron_mg: number
  magnesium_mg: number
  potassium_mg: number
  zinc_mg: number
  phosphorus_mg: number
  vitamin_a_iu_IU: number
  niacin_equivalents_mg: number
  vitamin_b6_mg: number
  vitamin_c_mg: number
  folate_mcg: number
  thiamin_mg: number
  riboflavin_mg: number
  vitamin_e_iu_IU: number
  vitamin_k_mcg: number
  biotin_mcg: number
  vitamin_b12_mcg: number
  mono_fat_g: number
  poly_fat_g: number
  trans_fatty_acid_g: number
  omega_3_fatty_acid_g: number
  omega_6_fatty_acid_g: number
}

// Kinda jank thing to loop through a bunch of recipes and then "loop" through their properties and add them up. For the daily overview
export const consolidateNutrientInfo = (nutrientInfos: NutrientInfoModel[]) => {
  let property: keyof NutrientInfoModel
  // better way to do this than initializing everything to zero?
  const result: NutrientInfoModel = {
    servings: 0,
    calories: 0,
    carbohydrates_g: 0,
    sugars_g: 0,
    fat_g: 0,
    saturated_fat_g: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    dietary_fiber_g: 0,
    sodium_mg: 0,
    calories_from_fat: 0,
    calcium_mg: 0,
    iron_mg: 0,
    magnesium_mg: 0,
    potassium_mg: 0,
    zinc_mg: 0,
    phosphorus_mg: 0,
    vitamin_a_iu_IU: 0,
    niacin_equivalents_mg: 0,
    vitamin_b6_mg: 0,
    vitamin_c_mg: 0,
    folate_mcg: 0,
    thiamin_mg: 0,
    riboflavin_mg: 0,
    vitamin_e_iu_IU: 0,
    vitamin_k_mcg: 0,
    biotin_mcg: 0,
    vitamin_b12_mcg: 0,
    mono_fat_g: 0,
    poly_fat_g: 0,
    trans_fatty_acid_g: 0,
    omega_3_fatty_acid_g: 0,
    omega_6_fatty_acid_g: 0
  }

  nutrientInfos.forEach((nutrientInfo) => {
    for (property in nutrientInfo) {
      const addedVal: number = Number(result[property] + nutrientInfo[property])
      result[property] = parseFloat(addedVal.toFixed(2))
    }
  })

  return result
}
