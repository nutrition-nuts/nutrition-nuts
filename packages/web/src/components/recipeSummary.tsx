import { RecipeModel } from '../models/recipeModels'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

interface Props {
  mealName: string
  recipe?: RecipeModel
}

export default function RecipeSummary(props: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflow: 'scroll',
    height: '80%',
    boxShadow: 24,
    p: 4
  }

  return (
    <>
      {props.recipe != null && (
        <>
          <hr />
          <a href="#" onClick={handleOpen}>
            <h3>
              {props.mealName}: {props.recipe.title}
            </h3>
          </a>
          <div>{props.recipe.description}</div>
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.recipe?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.recipe?.description}
          </Typography>
          <h4>Ingredients:</h4>
          <ul>
            {props.recipe?.ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
          <h4>Directions:</h4>
          <ul>
            {props.recipe?.directions.map((direction) => {
              return <li key={direction}>{direction}</li>
            })}
          </ul>
        </Box>
      </Modal>
    </>
  )
}
