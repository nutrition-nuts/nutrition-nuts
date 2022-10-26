import React, { useState } from 'react'

import Sidebar from '../components/sidebar'
import { getRecipes } from '../requests/recipe'
import '../App.css'
import './nutrition.css'
import { RecipeModel } from '../models/recipeModels'
import RecipeSummary from '../components/nutrition/recipeSummary'
import { FormControl, Box, Button, IconButton, Grid, Link } from '@mui/material'
import StyledTextField from '../components/StyledTextField'
import { Meal } from '../utils/meal'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import DailySummaryModal from '../components/nutrition/modal/dailySummary/dailySummaryModal'
import { getListFromLocalStorage } from '../utils/genericUtils'

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

  const [breakfastHasMorePages, setBreakfastHasMorePages] = useState(false)
  const [lunchHasMorePages, setLunchHasMorePages] = useState(false)
  const [dinnerHasMorePages, setDinnerHasMorePages] = useState(false)

  // jank nonsense to pass down information to child recipeSummary to reset its page
  const [recipeButtonClickedTime, setRecipeButtonClickedTime] = useState(
    Date.now()
  )

  const makeGetRecipeRequest = async (query: string, page: number) => {
    const allergies = getListFromLocalStorage<string>('allergies')
    return await getRecipes(query, allergies, page)
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

  const recipesPresent = () =>
    breakfastResults.length > 0 ||
    lunchResults.length > 0 ||
    dinnerResults.length > 0

  const handleOpenDailySummaryModal = () => setDailySummaryModalOpen(true)
  const handleCloseDailySummaryModal = () => setDailySummaryModalOpen(false)

  return (
    <div className="App">
      <Sidebar />

      {recipesPresent() && (
        <IconButton
          color="secondary"
          size="large"
          onClick={handleOpenDailySummaryModal}
          sx={{
            margin: '1rem',
            padding: '1rem',
            top: 'auto',
            right: '0',
            bottom: '0',
            left: 'auto',
            position: 'fixed'
          }}
        >
          <MenuBookIcon fontSize="large" />
        </IconButton>
      )}

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
                setBreakfastInput(e.target.value.replace(/[^a-z ]/gi, ''))
              }}
            ></StyledTextField>

            <StyledTextField
              id="recipe-lunch"
              value={lunchInput}
              label="Lunch"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(e) => {
                setLunchInput(e.target.value.replace(/[^a-z ]/gi, ''))
              }}
            ></StyledTextField>

            <StyledTextField
              id="recipe-dinner"
              value={dinnerInput}
              label="Dinner"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(e) => {
                setDinnerInput(e.target.value.replace(/[^a-z ]/gi, ''))
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
              <Link underline="hover" onClick={handleOpenDailySummaryModal}>
                <h2 className="header-link">Meal Plan for the day</h2>
              </Link>
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
              hasMorePages={breakfastHasMorePages}
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
              hasMorePages={lunchHasMorePages}
              getMoreRecipesCallback={getMoreRecipes}
              getAllRecipesButtonLastClicked={recipeButtonClickedTime}
              page={lunchPage}
              handleChangePage={setLunchPage}
            ></RecipeSummary>
            <RecipeSummary
              meal={Meal.DINNER}
              recipes={dinnerResults}
              foundStuff={dinnerFoundStuff}
              hasMorePages={dinnerHasMorePages}
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
