// source: https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
// TODO: make this more robust with sex, age, desired calories, weight, etc. elections

import { Nutrient } from './nutrient'
import store from './store'

// initialize to defaults
const dailyRecommendations: { [key in Nutrient]: number } = {
  [Nutrient.CALORIES]: 2000,
  [Nutrient.CARBOHYDRATES]: 275,
  [Nutrient.PROTEIN]: 50,
  [Nutrient.FAT]: 78,
  [Nutrient.SATURATED_FAT]: 20,
  [Nutrient.CHOLESTEROL]: 300,
  [Nutrient.SODIUM]: 2400,
  [Nutrient.DIETARY_FIBER]: 28,
  [Nutrient.VITAMIN_A]: 5000,
  [Nutrient.VITAMIN_C]: 90,
  [Nutrient.CALCIUM]: 1000,
  [Nutrient.IRON]: 18,
  [Nutrient.NIACIN]: 16,
  [Nutrient.MAGNESIUM]: 420,
  [Nutrient.FOLATE]: 400,
  [Nutrient.POTASSIUM]: 4700,
  [Nutrient.THIAMIN]: 1.2
}

export const getNutrientDailyRecommendation = (nutrient: Nutrient): number => {
  const storedNutrientOverride = store.getDailyNutrientGoal(nutrient)

  return storedNutrientOverride !== null
    ? +storedNutrientOverride
    : dailyRecommendations[nutrient]
}

export const setNutrientDailyRecommendation = (
  nutrient: Nutrient,
  goal: number
) => {
  if (goal === dailyRecommendations[nutrient]) {
    store.removeDailyNutrientGoal(nutrient)
  } else {
    store.setDailyNutrientGoal(nutrient, goal)
  }
}

export const getPercentageOfDailyRecommendation = (
  nutrient: Nutrient,
  progress: number
) => {
  const percentage = Math.floor(
    (progress / dailyRecommendations[nutrient]) * 100
  )

  return percentage
}
