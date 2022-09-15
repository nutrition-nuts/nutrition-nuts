import { RecipeModel } from "../models/recipeModels";

type Props = {
  mealName: string;
  recipe?: RecipeModel;
};

export default function Recipe(props: Props) {
  return (
    <>
      {props.recipe && (
        <>
          <hr/>
          <h3>{props.mealName}: {props.recipe.title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {props.recipe.ingredients.map((ingredient) => {
              return <li>{ingredient}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
}
