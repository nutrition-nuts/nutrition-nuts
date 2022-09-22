import React, { useState } from 'react'

import Button from '@mui/material/Button'
import NavBar from '../components/navbar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/recipeSummary'
import { getInputFieldValue } from '../utils/genericUtils'

export default function Nutrition() {
  const [recipes, setRecipes] = useState<RecipeModel[]>()
  const [breakfastInput, setBreakfastInput] = useState('')

  const makeGetRecipeRequest = async(query: string) => {
    const res = await getRecipes(query)
    setRecipes(res)
  }

  return (
    <div className="App">
      <NavBar />

      <div className="recipe-container">
        <div className="recipe-item">
          <h2>What are you feeling for...</h2>

          <label htmlFor="recipe-breakfast">Breakfast: </label>
          <input type="text" name="recipe-breakfast" onChange={e => setBreakfastInput(getInputFieldValue(e))} />
          <br />
          <label htmlFor="recipe-lunch">Lunch: </label>
          <input type="text" name="recipe-lunch"/>
          <br />
          <label htmlFor="recipe-dinner">Dinner: </label>
          <input type="text" name="recipe-dinner" />
          <br />
          <br />
          <Button variant="contained" onClick={async() => await makeGetRecipeRequest(breakfastInput)}>Find me recipes!</Button>
        </div>
        <div className="recipe-item">
          <h2>Meal Plan for the day</h2>
          <RecipeSummary
            mealName="Breakfast"
            recipe={recipes?.[0]}
          ></RecipeSummary>
          <RecipeSummary
            mealName="Lunch"
            recipe={recipes?.[0]}
          ></RecipeSummary>
          <RecipeSummary
            mealName="Dinner"
            recipe={recipes?.[0]}
          ></RecipeSummary>
        </div>
      </div>
    </div>
  )
}
