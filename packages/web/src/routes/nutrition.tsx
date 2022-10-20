import React, { useState } from 'react'

import Sidebar from '../components/sidebar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/nutrition/recipeSummary'
import { FormControl, Box, Button } from '@mui/material'
import StyledTextField from '../components/StyledTextField'
import { Meal } from '../utils/meal'

export default function Nutrition() {
  const [breakfastResults, setBreakfastResults] = useState<RecipeModel[]>([])
  const [lunchResults, setLunchResults] = useState<RecipeModel[]>([])
  const [dinnerResults, setDinnerResults] = useState<RecipeModel[]>([])

  const [breakfastInput, setBreakfastInput] = useState('')
  const [lunchInput, setLunchInput] = useState('')
  const [dinnerInput, setDinnerInput] = useState('')

  const [breakfastFoundStuff, setBreakfastFoundStuff] = useState(false)
  const [lunchFoundStuff, setLunchFoundStuff] = useState(false)
  const [dinnerFoundStuff, setDinnerFoundStuff] = useState(false)

  const [breakfastHasMorePages, setBreakfastHasMorePages] = useState(false)
  const [lunchHasMorePages, setLunchHasMorePages] = useState(false)
  const [dinnerHasMorePages, setDinnerHasMorePages] = useState(false)

  // jank nonsense to pass down information to child recipeSummary to reset its page
  const [recipeButtonClickedTime, setRecipeButtonClickedTime] = useState(
    Date.now()
  )

  const makeGetRecipeRequest = async (query: string, page: number) => {
    return await getRecipes(
      query,
      localStorage.getItem('allergies') ?? '[]',
      page.toString()
    )
  }

  const onFindRecipesButtonClick = async () => {
    setRecipeButtonClickedTime(Date.now())
    const breakfast = await makeGetRecipeRequest(breakfastInput, 1)
    // console.log(breakfast)
    setBreakfastResults(breakfast.recipes)
    setBreakfastFoundStuff(breakfast.foundStuff)
    setBreakfastHasMorePages(breakfast.hasMorePages)
    const lunch = await makeGetRecipeRequest(lunchInput, 1)
    setLunchResults(lunch.recipes)
    setLunchFoundStuff(lunch.foundStuff)
    setLunchHasMorePages(lunch.hasMorePages)
    const dinner = await makeGetRecipeRequest(dinnerInput, 1)
    setDinnerResults(dinner.recipes)
    setDinnerFoundStuff(dinner.foundStuff)
    setDinnerHasMorePages(dinner.hasMorePages)
  }

  const getMoreRecipes = async (page: number, meal: Meal) => {
    let mealResults: {
      recipes: RecipeModel[]
      foundStuff: boolean
      hasMorePages: boolean
    }
    switch (meal) {
      case Meal.BREAKFAST:
        mealResults = await makeGetRecipeRequest(breakfastInput, page)
        setBreakfastResults(mealResults.recipes)
        setBreakfastFoundStuff(mealResults.foundStuff)
        setBreakfastHasMorePages(mealResults.hasMorePages)
        break
      case Meal.LUNCH:
        mealResults = await makeGetRecipeRequest(lunchInput, page)
        setLunchResults(mealResults.recipes)
        setLunchFoundStuff(mealResults.foundStuff)
        setLunchHasMorePages(mealResults.hasMorePages)
        break
      case Meal.DINNER:
        mealResults = await makeGetRecipeRequest(dinnerInput, page)
        setDinnerResults(mealResults.recipes)
        setDinnerFoundStuff(mealResults.foundStuff)
        setDinnerHasMorePages(mealResults.hasMorePages)
        break
    }
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="recipe-container">
        <div className="recipe-search">
          <h2 id="search-header">Search Meals</h2>
          <Box
            display="flex"
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <StyledTextField
              id="recipe-breakfast"
              value={breakfastInput}
              label="Breakfast"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(e) => {
                setBreakfastInput(e.target.value)
              }}
            ></StyledTextField>

            <StyledTextField
              id="recipe-lunch"
              value={lunchInput}
              label="Lunch"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(e) => {
                setLunchInput(e.target.value)
              }}
            ></StyledTextField>

            <StyledTextField
              id="recipe-dinner"
              value={dinnerInput}
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
                onClick={async () => await onFindRecipesButtonClick()}
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
            meal={Meal.BREAKFAST}
            recipes={breakfastResults}
            foundStuff={breakfastFoundStuff}
            hasMorePages={breakfastHasMorePages}
            getMoreRecipesCallback={getMoreRecipes}
            getAllRecipesButtonLastClicked={recipeButtonClickedTime}
          ></RecipeSummary>
          <RecipeSummary
            meal={Meal.LUNCH}
            recipes={lunchResults}
            foundStuff={lunchFoundStuff}
            hasMorePages={lunchHasMorePages}
            getMoreRecipesCallback={getMoreRecipes}
            getAllRecipesButtonLastClicked={recipeButtonClickedTime}
          ></RecipeSummary>
          <RecipeSummary
            meal={Meal.DINNER}
            recipes={dinnerResults}
            foundStuff={dinnerFoundStuff}
            hasMorePages={dinnerHasMorePages}
            getMoreRecipesCallback={getMoreRecipes}
            getAllRecipesButtonLastClicked={recipeButtonClickedTime}
          ></RecipeSummary>
          <hr />
        </div>
      </div>
    </div>
  )
}
