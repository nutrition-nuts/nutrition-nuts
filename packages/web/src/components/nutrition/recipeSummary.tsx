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
  hasMorePages: Boolean
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

  const resultsRandomlyGeneratedMessage = () => {
    let res: string
    if (!props.foundStuff && !props.hasMorePages) {
      res =
        "We couldn't find anything based on what you typed. Here are some random recipes!"
    } else {
      res = "Since you didn't enter anything, here are some random recipes!"
    }
    return res
  }

  return (
    <>
      {props.recipes.length !== 0 && props.recipes.length >= props.page && (
        <>
          <Accordion expanded={expand} onChange={toggleAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: '#1b1b1b',
                border: 2,
                borderColor: 'gray',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '1.5rem' }}>
                {mealName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: '#1b1b1b',
                border: 2,
                borderColor: 'gray',
                color: 'white'
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
                    title={resultsRandomlyGeneratedMessage()}
                    TransitionComponent={Zoom}
                  >
                    <IconButton>
                      <InfoIcon
                        sx={{
                          color: 'white'
                        }}
                      />
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
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: 'white'
                      }
                    }}
                  />
                </Grid>
                {(props.hasMorePages || !props.foundStuff) && (
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
