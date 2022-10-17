import React, { useState } from 'react'

import Sidebar from '../components/sidebar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/nutrition/recipeSummary'
import { FormControl, Box, Button } from '@mui/material'
import StyledTextField from '../components/StyledTextField'

export default function Nutrition() {
  const [breakfastResults, setBreakfastResults] = useState<RecipeModel[]>([])
  const [lunchResults, setLunchResults] = useState<RecipeModel[]>([])
  const [dinnerResults, setDinnerResults] = useState<RecipeModel[]>([])

  const [breakfastInput, setBreakfastInput] = useState('')
  const [lunchInput, setLunchInput] = useState('')
  const [dinnerInput, setDinnerInput] = useState('')

  const makeGetRecipeRequest = async (query: string) => {
    return await getRecipes(query, localStorage.getItem('allergies') ?? '')
    // const allergies = localStorage.getItem('allergies') ?? ''
    // return await getRecipes(query, Array(JSON.parse(allergies)))
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
          <Box display="flex" style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
              <StyledTextField
                  id="recipe-breakfast"
                  value={ breakfastInput }
                  label="Breakfast"
                  variant="outlined"
                  sx={{ m: 1 }}
                  onChange={(e) => {
                    setBreakfastInput(e.target.value)
                  }}
              ></StyledTextField>

              <StyledTextField
                  id="recipe-lunch"
                  value={ lunchInput }
                  label="Lunch"
                  variant="outlined"
                  sx={{ m: 1 }}
                  onChange={(e) => {
                    setLunchInput(e.target.value)
                  }}
              ></StyledTextField>

              <StyledTextField
                  id="recipe-dinner"
                  value={ dinnerInput }
                  label="Dinner"
                  variant="outlined"
                  sx={{ m: 1 }}
                  onChange={(e) => {
                    setDinnerInput(e.target.value)
                  }}
              ></StyledTextField>

            <FormControl sx={{ m: 1 }}>
              <Button
                variant="contained"
                onClick={async() => await onFindRecipesButtonClick()}
                style={{
                  background: '#506f8c'
                }}
              >
                Find me recipes!
              </Button>
            </FormControl>
          </Box>
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
