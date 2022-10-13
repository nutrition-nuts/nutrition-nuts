import { RecipeModel } from '../../../models/recipeModels'
import Typography from '@mui/material/Typography'
import NutritionPercentageCard from '../nutritionPercentageCard'
import {
  dailyCalorieRecommendation,
  dailyCarbGramRecommendation,
  dailyProteinGramRecommendation
} from '../../../utils/nutritionRecommendations'
import Card from '@mui/material/Card'
import { CardContent, Grid, Link } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalOverview(props: Props) {
  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.recipe.summary} <br /> - {props.recipe.author}
      </Typography>

      <div style={{ display: 'inline' }}>
        <Card sx={{ marginTop: '2rem' }}>
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
        <Link href={props.recipe.url} underline="hover" target={'_blank'}>
          <Card sx={{ marginTop: '2rem', width: 'fit' }}>
            <CardContent sx={{ color: 'primary' }}>
              <Grid container>
                <Grid item xs={8}>
                  See {props.recipe.name} on AllRecipes!
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                  <ArrowForwardIosIcon />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}
