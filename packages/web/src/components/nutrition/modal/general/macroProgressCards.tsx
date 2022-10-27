import { Card, CardContent, Grid } from '@mui/material'
import { NutrientInfoModel } from '../../../../models/recipeModels'
import { Nutrient } from '../../../../utils/nutrient'
import { getNutrientDailyRecommendation } from '../../../../utils/nutritionRecommendations'
import NutritionPercentageCard from '../../nutritionPercentageCard'

interface Props {
  nutrientInfo: NutrientInfoModel
}

export default function MacroProgressCards(props: Props) {
  return (
    <Card sx={{ marginTop: '2rem' }}>
      <CardContent>
        <Grid container spacing={2}>
          <NutritionPercentageCard
            name="Calories"
            goal={getNutrientDailyRecommendation(Nutrient.CALORIES)}
            progress={props.nutrientInfo.calories}
            unit=""
          />
          <NutritionPercentageCard
            name="Protein"
            goal={getNutrientDailyRecommendation(Nutrient.PROTEIN)}
            progress={props.nutrientInfo.protein_g}
            unit="grams"
          />
          <NutritionPercentageCard
            name="Carbohydrates"
            goal={getNutrientDailyRecommendation(Nutrient.CARBOHYDRATES)}
            progress={props.nutrientInfo.carbohydrates_g}
            unit="grams"
          />
          <NutritionPercentageCard
            name="Fat"
            goal={getNutrientDailyRecommendation(Nutrient.FAT)}
            progress={props.nutrientInfo.fat_g}
            unit="grams"
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
