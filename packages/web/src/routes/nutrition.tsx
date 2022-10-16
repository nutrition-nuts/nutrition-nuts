import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Sidebar from '../components/sidebar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/nutrition/recipeSummary'
import { getInputFieldValue } from '../utils/genericUtils'

export default function Nutrition() {
  const [breakfastResults, setBreakfastResults] = useState<RecipeModel[]>([])
  const [lunchResults, setLunchResults] = useState<RecipeModel[]>([])
  const [dinnerResults, setDinnerResults] = useState<RecipeModel[]>([])

  const [breakfastInput, setBreakfastInput] = useState('')
  const [lunchInput, setLunchInput] = useState('')
  const [dinnerInput, setDinnerInput] = useState('')

  const makeGetRecipeRequest = async(query: string) => {
    return await getRecipes(query, (localStorage.getItem('allergies') ?? ''))
  }

  const onFindRecipesButtonClick = async() => {
    const breakfast = await makeGetRecipeRequest(breakfastInput)
    console.log(breakfast)
    setBreakfastResults(breakfast)
    const lunch = await makeGetRecipeRequest(lunchInput)
    setLunchResults(lunch)
    const dinner = await makeGetRecipeRequest(dinnerInput)
    setDinnerResults(dinner)
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="recipe-container">
        <div className="recipe-search">
          <h2 id="search-header">Search Meals</h2>

          <label htmlFor="recipe-breakfast">Breakfast: </label>
          <input
            type="text"
            name="recipe-breakfast"
            onChange={(e) => setBreakfastInput(getInputFieldValue(e))}
          />

          <label htmlFor="recipe-lunch">Lunch: </label>
          <input
            type="text"
            name="recipe-lunch"
            onChange={(e) => setLunchInput(getInputFieldValue(e))}
          />

          <label htmlFor="recipe-dinner">Dinner: </label>
          <input
            type="text"
            name="recipe-dinner"
            onChange={(e) => setDinnerInput(getInputFieldValue(e))}
          />
          <Button
            variant="contained"
            onClick={async() => await onFindRecipesButtonClick()}
          >
            Find me recipes!
          </Button>
        </div>
        <div className="recipe-item">
          <h2>Meal Plan for the day</h2>
          <RecipeSummary
            mealName="Breakfast"
            recipes={breakfastResults}
          ></RecipeSummary>
          <RecipeSummary
            mealName="Lunch"
            recipes={lunchResults}
          ></RecipeSummary>
          <RecipeSummary
            mealName="Dinner"
            recipes={dinnerResults}
          ></RecipeSummary>
          <hr />
        </div>
      </div>
    </div>
  )
}
