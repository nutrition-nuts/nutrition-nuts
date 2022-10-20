import React, { useState } from 'react'

import Sidebar from '../components/sidebar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/nutrition/recipeSummary'
import { FormControl, Box, Button, IconButton, Grid } from '@mui/material'
import StyledTextField from '../components/StyledTextField'
import { Meal } from '../utils/meal'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import DailySummaryModal from '../components/nutrition/modal/dailySummary/dailySummaryModal'

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

  const [breakfastPage, setBreakfastPage] = useState(1)
  const [lunchPage, setLunchPage] = useState(1)
  const [dinnerPage, setDinnerPage] = useState(1)

  const [dailySummaryModalOpen, setDailySummaryModalOpen] = useState(false)

  // jank nonsense to pass down information to child recipeSummary to reset its page
  const [recipeButtonClickedTime, setRecipeButtonClickedTime] = useState(
    Date.now()
  )

  const makeGetRecipeRequest = async (query: string, page: number) => {
    return await getRecipes(
      query,
      localStorage.getItem('allergies') ?? '',
      page.toString()
    )
  }

  const onFindRecipesButtonClick = async () => {
    setRecipeButtonClickedTime(Date.now())
    const breakfast = await makeGetRecipeRequest(breakfastInput, 1)
    // console.log(breakfast)
    setBreakfastResults(breakfast.recipes)
    setBreakfastFoundStuff(breakfast.found_stuff)
    const lunch = await makeGetRecipeRequest(lunchInput, 1)
    setLunchResults(lunch.recipes)
    setLunchFoundStuff(lunch.found_stuff)
    const dinner = await makeGetRecipeRequest(dinnerInput, 1)
    setDinnerResults(dinner.recipes)
    setDinnerFoundStuff(dinner.found_stuff)
  }

  const getMoreRecipes = async (page: number, meal: Meal) => {
    let mealResults: {
      recipes: RecipeModel[]
      found_stuff: boolean
    }
    switch (meal) {
      case Meal.BREAKFAST:
        mealResults = await makeGetRecipeRequest(breakfastInput, page)
        setBreakfastResults(mealResults.recipes)
        setBreakfastFoundStuff(mealResults.found_stuff)
        break
      case Meal.LUNCH:
        mealResults = await makeGetRecipeRequest(lunchInput, page)
        setLunchResults(mealResults.recipes)
        setLunchFoundStuff(mealResults.found_stuff)
        break
      case Meal.DINNER:
        mealResults = await makeGetRecipeRequest(dinnerInput, page)
        setDinnerResults(mealResults.recipes)
        setDinnerFoundStuff(mealResults.found_stuff)
        break
    }
  }

  const recipesPresent = () =>
    breakfastResults.length > 0 ||
    lunchResults.length > 0 ||
    dinnerResults.length > 0

  const handleOpenDailySummaryModal = () => setDailySummaryModalOpen(true)
  const handleCloseDailySummaryModal = () => setDailySummaryModalOpen(false)

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
              >
                Find me recipes!
              </Button>
            </FormControl>
          </Box>
        </div>
        {recipesPresent() && (
          <div className="recipe-item">
            <Grid container justifyContent="center">
              <h2>Meal Plan for the day</h2>
              <IconButton
                color="primary"
                size="large"
                onClick={handleOpenDailySummaryModal}
              >
                <MenuBookIcon fontSize="large" />
              </IconButton>
              <DailySummaryModal
                open={dailySummaryModalOpen}
                recipes={[
                  breakfastResults[breakfastPage - 1],
                  lunchResults[lunchPage - 1],
                  dinnerResults[dinnerPage - 1]
                ]}
                handleClose={handleCloseDailySummaryModal}
              />
            </Grid>
            <RecipeSummary
              meal={Meal.BREAKFAST}
              recipes={breakfastResults}
              foundStuff={breakfastFoundStuff}
              getMoreRecipesCallback={getMoreRecipes}
              getAllRecipesButtonLastClicked={recipeButtonClickedTime}
              page={breakfastPage}
              handleChangePage={setBreakfastPage}
            ></RecipeSummary>
            <RecipeSummary
              meal={Meal.LUNCH}
              recipes={lunchResults}
              foundStuff={lunchFoundStuff}
              getMoreRecipesCallback={getMoreRecipes}
              getAllRecipesButtonLastClicked={recipeButtonClickedTime}
              page={lunchPage}
              handleChangePage={setLunchPage}
            ></RecipeSummary>
            <RecipeSummary
              meal={Meal.DINNER}
              recipes={dinnerResults}
              foundStuff={dinnerFoundStuff}
              getMoreRecipesCallback={getMoreRecipes}
              getAllRecipesButtonLastClicked={recipeButtonClickedTime}
              page={dinnerPage}
              handleChangePage={setDinnerPage}
            ></RecipeSummary>
            <hr />
          </div>
        )}
      </div>
    </div>
  )
}
