import { RecipeModel } from '../../models/recipeModels'
import { useEffect, useState } from 'react'
import RecipeModal from './modal/recipe/recipeModal'
import Pagination from '@mui/material/Pagination'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../../App.css'
import { Button, Grid, IconButton, Tooltip, Zoom } from '@mui/material'
import { Meal } from '../../utils/meal'
import InfoIcon from '@mui/icons-material/Info'

interface Props {
  meal: Meal
  recipes: RecipeModel[]
  foundStuff: Boolean
  page: number
  handleChangePage: (page: number) => void
  getMoreRecipesCallback: (page: number, meal: Meal) => void
  getAllRecipesButtonLastClicked: number
}

export default function RecipeSummary(props: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [expand, setExpand] = useState(true)
  const [requestPage, setRequestPage] = useState(1)

  const toggleAccordion = () => {
    setExpand((prev) => !prev)
  }

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    props.handleChangePage(value)
  }

  useEffect(() => setRequestPage(1), [props.getAllRecipesButtonLastClicked])

  useEffect(() => props.handleChangePage(1), [props.recipes])

  const handleMoreRecipesButtonClicked = () => {
    props.getMoreRecipesCallback(requestPage + 1, props.meal)
    setRequestPage(requestPage + 1)
  }

  const mealName =
    Meal[props.meal].charAt(0) + Meal[props.meal].slice(1).toLowerCase()

  const resultsRandomlyGeneratedMessage =
    'These recipe results were randomly generated. Either you have left the input box empty, or there are no (more) results that match your query.'

  return (
    <>
      {props.recipes.length !== 0 && props.recipes.length >= props.page && (
        <>
          <hr />
          <Accordion expanded={expand} onChange={toggleAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: '#7ea1a8',
                border: 2,
                borderColor: '#506f8c'
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '1.5rem' }}>
                {mealName}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                backgroundColor: '#7ea1a8',
                border: 2,
                borderColor: '#506f8c'
              }}
            >
              <Grid container justifyContent="center">
                <h3 onClick={handleOpen} className="header-link">
                  {mealName}: {props.recipes[props.page - 1].name}
                </h3>
                {!props.foundStuff && (
                  <Tooltip
                    arrow
                    disableFocusListener
                    disableTouchListener
                    title={resultsRandomlyGeneratedMessage}
                    TransitionComponent={Zoom}
                  >
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
              <div>
                <div>
                  Calories: {props.recipes[props.page - 1].calories} | Fat:{' '}
                  {props.recipes[props.page - 1].fat_g}g | Carbs:{' '}
                  {props.recipes[props.page - 1].carbohydrates_g}g | Protein:{' '}
                  {props.recipes[props.page - 1].protein_g}g
                </div>
              </div>
              <Grid
                container
                style={{ textAlign: 'center', marginTop: '1rem' }}
                justifyContent="center"
              >
                <Grid item>
                  <Pagination
                    count={props.recipes.length}
                    page={props.page}
                    onChange={handleChangePage}
                    color="primary"
                    className="center"
                  />
                </Grid>
                {props.foundStuff && (
                  <Grid item>
                    <Button onClick={handleMoreRecipesButtonClicked}>
                      More Recipes
                    </Button>
                  </Grid>
                )}
              </Grid>

              <RecipeModal
                open={open}
                handleClose={handleClose}
                recipe={props.recipes[props.page - 1]}
              ></RecipeModal>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  )
}
