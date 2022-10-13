export enum Nutrient {
  CALORIES,
  CARBOHYDRATES,
  PROTEIN,
  FAT,
  SATURATED_FAT,
  CHOLESTEROL,
  SODIUM,
  DIETARY_FIBER,
  VITAMIN_A,
  VITAMIN_C,
  CALCIUM,
  IRON
}

export interface NutrientDetails {
  name: string
  unit: string
}

const nutrientAndDetails: { [key in Nutrient]: NutrientDetails } = {
  [Nutrient.CALORIES]: {
    name: 'Calories',
    unit: 'kcal'
  },
  [Nutrient.CARBOHYDRATES]: {
    name: 'Carbohydrates',
    unit: 'g'
  },
  [Nutrient.PROTEIN]: {
    name: 'Protein',
    unit: 'g'
  },
  [Nutrient.FAT]: {
    name: 'Fat',
    unit: 'g'
  },
  [Nutrient.SATURATED_FAT]: {
    name: 'Saturated Fat',
    unit: 'g'
  },
  [Nutrient.CHOLESTEROL]: {
    name: 'Cholesterol',
    unit: 'mg'
  },
  [Nutrient.SODIUM]: {
    name: 'Sodium',
    unit: 'mg'
  },
  [Nutrient.DIETARY_FIBER]: {
    name: 'Dietary fiber',
    unit: 'g'
  },
  [Nutrient.VITAMIN_A]: {
    name: 'Vitamin A',
    unit: 'IU'
  },
  [Nutrient.VITAMIN_C]: {
    name: 'Vitamin C',
    unit: 'mg'
  },
  [Nutrient.CALCIUM]: {
    name: 'Calcium',
    unit: 'mg'
  },
  [Nutrient.IRON]: {
    name: 'Iron',
    unit: 'mg'
  }
}

export const getNutrientName = (nutrient: Nutrient) =>
  nutrientAndDetails[nutrient].name

export const getNutrientUnit = (nutrient: Nutrient) =>
  nutrientAndDetails[nutrient].unit
