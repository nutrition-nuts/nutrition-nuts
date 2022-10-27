import { RecipeModel } from '../../../../models/recipeModels'

interface Props {
  recipe: RecipeModel
}

export default function RecipeModalDirections(props: Props) {
  return (
    <>
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
    </>
  )
}
