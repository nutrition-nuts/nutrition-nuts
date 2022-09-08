import React from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import { getRecipe } from "../requests/recipe";
import "../App.css";
import "./nutrition.css";
import { DailyRecipes } from "../models/recipeModels";
import Recipe from "../components/recipe";

export default function Nutrition() {
  const [dailyRecipes, setDailyRecipes] = useState<DailyRecipes>();
  const recipeRequest = async () => {
    const res = await getRecipe();
    setDailyRecipes(res);
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
          <button onClick={recipeRequest}>Find me recipes!</button>
        </div>
        <div className="recipe-item">
          <h2>Meal Plan for the day</h2>
          <Recipe
            mealName="Breakfast"
            recipe={dailyRecipes?.breakfast}
          ></Recipe>
          <Recipe
            mealName="Lunch"
            recipe={dailyRecipes?.lunch}
          ></Recipe>
          <Recipe
            mealName="Dinner"
            recipe={dailyRecipes?.dinner}
          ></Recipe> 
        </div>
      </div>
    </div>
  );
}
