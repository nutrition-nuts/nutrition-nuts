import { RecipeModel } from '../../../models/recipeModels'
import Typography from '@mui/material/Typography'
import NutritionPercentageCard from '../nutritionPercentageCard'
import {
  dailyCalorieRecommendation,
  dailyCarbGramRecommendation,
  dailyProteinGramRecommendation
} from '../../../utils/nutritionRecommendations'
import Card from '@mui/material/Card'
import { CardContent, Grid } from '@mui/material'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalOverview(props: Props) {
  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.recipe.summary}
      </Typography>
      <a href={props.recipe.url}>Link</a>

      <div style={{ display: 'inline' }}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <NutritionPercentageCard
                name="Calories"
                goal={dailyCalorieRecommendation()}
                progress={props.recipe.calories}
                unit=""
              />
              <NutritionPercentageCard
                name="Protein"
                goal={dailyProteinGramRecommendation()}
                progress={props.recipe.protein_g}
                unit="grams"
              />
              <NutritionPercentageCard
                name="Carbohydrates"
                goal={dailyCarbGramRecommendation()}
                progress={props.recipe.carbohydrates_g}
                unit="grams"
              />
              <NutritionPercentageCard
                name="Protein"
                goal={dailyProteinGramRecommendation()}
                progress={props.recipe.protein_g}
                unit="grams"
              />
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
