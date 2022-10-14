import { CardContent, Typography } from '@mui/material'
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
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Nutrient Profile
                  </Typography>
                  <LinearNutrientProgress
                    nutrient={Nutrient.VITAMIN_A}
                    progress={props.recipe.vitamin_a_iu_IU}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.VITAMIN_C}
                    progress={props.recipe.vitamin_c_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.THIAMIN}
                    progress={props.recipe.thiamin_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.NIACIN}
                    progress={props.recipe.niacin_equivalents_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.IRON}
                    progress={props.recipe.iron_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.CALCIUM}
                    progress={props.recipe.calcium_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.POTASSIUM}
                    progress={props.recipe.potassium_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.MAGNESIUM}
                    progress={props.recipe.magnesium_mg}
                  />
                  <LinearNutrientProgress
                    nutrient={Nutrient.FOLATE}
                    progress={props.recipe.folate_mcg}
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
