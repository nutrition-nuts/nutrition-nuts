import React from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import { getRecipes } from "../requests/recipe";
import "../App.css";
import "./nutrition.css";
import { RecipeModel } from "../models/recipeModels";
import Recipe from "../components/recipe";

export default function Nutrition() {
  const [recipes, setRecipes] = useState<RecipeModel[]>();

  const makeGetRecipeRequest = async (query: string) => {
    const res = await getRecipes(query);
    setRecipes(res);
  };

  return (
    <div className="App">
      <NavBar />

      <div className="recipe-container">
        <div className="recipe-item">
          <h2>What are you feeling for...</h2>

          <label htmlFor="recipe-breakfast">Breakfast: </label>
          <input type="text" name="recipe-breakfast" />
          <br />
          <label htmlFor="recipe-lunch">Lunch: </label>
          <input type="text" name="recipe-lunch" />
          <br />
          <label htmlFor="recipe-dinner">Dinner: </label>
          <input type="text" name="recipe-dinner" />
          <br />
          <br />
          <button onClick={() => makeGetRecipeRequest("petite")}>Find me recipes!</button>
        </div>
        <div className="recipe-item">
          <h2>Meal Plan for the day</h2>
          <Recipe
            mealName="Breakfast"
            recipe={recipes?.[0]}
          ></Recipe>
          <Recipe
            mealName="Lunch"
            recipe={recipes?.[0]}
          ></Recipe>
          <Recipe
            mealName="Dinner"
            recipe={recipes?.[0]}
          ></Recipe> 
        </div>
      </div>
    </div>
  );
}
