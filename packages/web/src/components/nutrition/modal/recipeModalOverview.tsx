import { RecipeModel } from '../../../models/recipeModels'
import Typography from '@mui/material/Typography'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalOverview(props: Props) {
  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.recipe.summary}
      </Typography>
    </>
  )
}
