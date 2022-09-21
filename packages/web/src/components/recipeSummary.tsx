import { RecipeModel } from '../models/recipeModels'

interface Props {
  mealName: string
  recipe?: RecipeModel
}

export default function RecipeSummary(props: Props) {
  return (
    <>
      {props.recipe != null && (
        <>
          <hr />
          <h3>
            {props.mealName}: {props.recipe.title}
          </h3>
          <div>{props.recipe.description}</div>
        </>
      )}
    </>
  )
}
