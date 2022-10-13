import { CardContent } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { RecipeModel } from '../../../models/recipeModels'
import { Nutrient } from '../../../utils/nutrient'
import LinearNutrientProgress from '../linearNutrientProgress'
import NutritionFacts from '../nutritionFacts/nutritionFacts'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalNutritionDetails(props: Props) {
  return (
    <>
      <Grid container sx={{ marginTop: '2rem' }}>
        <Grid item xs={4}>
          <NutritionFacts recipe={props.recipe} />
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={5}>
              <Card>
                <CardContent>
                  <LinearNutrientProgress
                    nutrient={Nutrient.VITAMIN_A}
                    progress={props.recipe.vitamin_a_iu_IU}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.VITAMIN_C}
                    progress={props.recipe.vitamin_c_mg}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
