import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { RecipeModel } from '../models/recipeModels'
import NutritionFacts from './nutritionFacts'

interface Props {
  open: boolean
  handleClose: () => void
  recipe: RecipeModel
}

export default function RecipeModal(props: Props) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    overflow: 'scroll',
    height: '80%',
    p: 4
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.recipe.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.recipe.summary}
        </Typography>
        <h4>Ingredients:</h4>
        <ul>
          {props.recipe.ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <h4>Directions:</h4>
        <ul>
          {props.recipe.directions.map((direction) => {
            return <li key={direction}>{direction}</li>
          })}
        </ul>

        <NutritionFacts recipe={props.recipe} />
      </Box>
    </Modal>
  )
}
