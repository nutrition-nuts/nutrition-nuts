import { RecipeModel } from '../../../models/recipeModels'
import Typography from '@mui/material/Typography'
import NutritionPercentageCard from '../nutritionPercentageCard'
import {
  dailyCarbGramRecommendation,
  dailyProteinGramRecommendation
} from '../../../utils/nutritionRecommendations'

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

      <div>
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
      </div>
    </>
  )
}
