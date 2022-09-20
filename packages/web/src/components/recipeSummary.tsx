import { RecipeModel } from '../models/recipeModels'
import { useState } from 'react'
import RecipeModal from './recipeModal'

interface Props {
  mealName: string
  recipe?: RecipeModel
}

export default function RecipeSummary(props: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <RecipeModal
            open={open}
            handleClose={handleClose}
            recipe={props.recipe}
          ></RecipeModal>
        </>
      )}
    </>
  )
}
