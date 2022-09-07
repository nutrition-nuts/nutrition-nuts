import React from "react";
import { useState } from "react";
import NavBar from "../components/navbar";
import { getRecipe } from "../requests/recipe";
import "../App.css";
import "./nutrition.css";

export default function Nutrition() {
  const [message, setMessage] = useState("")
  const recipeRequest = async () => {
     const res = await getRecipe();
     setMessage(JSON.stringify(res.data) ?? "bad request")
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
                    <br /><br />
                    <button onClick={recipeRequest}>Find me recipes!</button>
                </div>
                <div className="recipe-item">
                    <h2>Meal Plan for the day</h2>
                    <div className="recipe-content" dangerouslySetInnerHTML={{__html: message}}></div>
                </div>
            </div>
        </div>
  );
}
