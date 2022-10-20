import Grid from '@mui/material/Grid'
import { NutrientInfoModel } from '../../../../models/recipeModels'
import NutritionFacts from '../../nutritionFacts/nutritionFacts'
import NutrientProgressBars from '../general/nutrientProgessBars'

interface Props {
  nutrients: NutrientInfoModel
}

export default function RecipeModalNutritionDetails(props: Props) {
  return (
    <>
      <Grid container sx={{ marginTop: '2rem' }}>
        <Grid item xs={4}>
          <NutritionFacts nutrients={props.nutrients} />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={5}>
              <NutrientProgressBars nutrientInfo={props.nutrients} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
