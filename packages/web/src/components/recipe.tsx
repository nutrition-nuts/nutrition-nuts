import { RecipeModel } from '../models/recipeModels'

interface Props {
  mealName: string
  recipe?: RecipeModel
}

export default function Recipe (props: Props) {
  return (
    <>
      {(props.recipe != null) && (
        <>
          <hr/>
          <h3>{props.mealName}: {props.recipe.title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {props.recipe.ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
        </>
      )}
    </>
  )
}
