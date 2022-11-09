import { Nutrient } from '../nutrient'
import { agePattern, namePattern, nutrientPattern } from './patternConstants'

const getDailyNutrientGoal = (nutrient: Nutrient) => {
  return getLocalStorageItem(
    formatNutrientStorageKey(nutrient),
    null,
    nutrientPattern
  )
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

const getLocalStorageItem = (
  key: string,
  defaultValue: string | null,
  pattern: RegExp
) => {
  const itemInStorage = localStorage.getItem(key) ?? ''

  if (!pattern.test(itemInStorage)) {
    // then the user put something bad manually in the storage
    if (defaultValue !== null) {
      localStorage.setItem(key, defaultValue)
    } else {
      localStorage.removeItem(key)
    }
    return defaultValue
  } else {
    return itemInStorage
  }
}

const setLocalStorageItem = (
  key: string,
  value: string,
  defaultValue: string,
  pattern: RegExp
) => {
  if (pattern.test(value)) {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, defaultValue)
  }
}

const getName = () => {
  return getLocalStorageItem('name', '', namePattern)
}

const setName = (name: string) => {
  setLocalStorageItem('name', name, '', namePattern)
}

const getAge = () => {
  return getLocalStorageItem('age', '', agePattern)
}

const setAge = (age: string) => {
  setLocalStorageItem('age', age, '', agePattern)
}

const getAllergies = () => {
  return localStorage.getItem('allergies')
}

const setAllergies = (allergies: string) => {
  localStorage.setItem('allergies', allergies)
}

const getMacroRatios = () => {
  return localStorage.getItem('macroRatios')
}

const setMacroRatios = (macroRatios: string) => {
  localStorage.setItem('macroRatios', macroRatios)
}

const profileExists = () => {
  return getName() !== ''
}

export default {
  getDailyNutrientGoal,
  setDailyNutrientGoal,
  removeDailyNutrientGoal,
  getName,
  setName,
  getAge,
  setAge,
  getAllergies,
  setAllergies,
  getMacroRatios,
  setMacroRatios,
  profileExists
}
