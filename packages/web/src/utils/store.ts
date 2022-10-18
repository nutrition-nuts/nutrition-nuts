import { Nutrient } from './nutrient'

const getDailyNutrientGoal = (nutrient: Nutrient) => {
  return localStorage.getItem(formatNutrientStorageKey(nutrient))
}

const setDailyNutrientGoal = (nutrient: Nutrient, goal: number | string) => {
  localStorage.setItem(formatNutrientStorageKey(nutrient), goal.toString())
}

const removeDailyNutrientGoal = (nutrient: Nutrient) => {
  localStorage.removeItem(formatNutrientStorageKey(nutrient))
}

const formatNutrientStorageKey = (nutrient: Nutrient) => {
  return `nutrient-goal-${Nutrient[nutrient]}`
}

const getName = () => {
  return localStorage.getItem('name')
}

const getAge = () => {
  return localStorage.getItem('age')
}

const getAllergies = () => {
  return localStorage.getItem('allergies')
}

export default {
  getDailyNutrientGoal,
  setDailyNutrientGoal,
  removeDailyNutrientGoal,
  getName,
  getAge,
  getAllergies
}
