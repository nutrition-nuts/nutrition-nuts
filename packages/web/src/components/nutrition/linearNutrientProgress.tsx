import {
  getNutrientName,
  getNutrientUnit,
  Nutrient
} from '../../utils/nutrient'
import {
  getNutrientDailyRecommendation,
  getPercentageOfDailyRecommendation
} from '../../utils/nutritionRecommendations'
import LinearProgressWithLabel from '../progress/LinearProgressWithLabel'

interface Props {
  nutrient: Nutrient
  progress: number
}

export default function LinearNutrientProgress(props: Props) {
  return (
    <>
      {props.progress != null && (
        <LinearProgressWithLabel
          value={getPercentageOfDailyRecommendation(
            props.nutrient,
            props.progress
          )}
          label={`${getNutrientName(props.nutrient)}- ${
            props.progress
          } / ${getNutrientDailyRecommendation(
            props.nutrient
          )} ${getNutrientUnit(props.nutrient)}`}
        />
      )}
    </>
  )
}
