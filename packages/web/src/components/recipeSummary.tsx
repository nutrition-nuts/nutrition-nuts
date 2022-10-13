import { RecipeModel } from '../models/recipeModels'
import { useEffect, useState } from 'react'
import RecipeModal from './recipeModal'
import Pagination from '@mui/material/Pagination'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../App.css'

interface Props {
  mealName: string
  recipes: RecipeModel[]
}

export default function RecipeSummary(props: Props) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [expand, setExpand] = useState(true)

  const toggleAccordion = () => {
    setExpand((prev) => !prev)
  }

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  useEffect(() => setPage(1), [props.recipes])

  return (
    <>
      {props.recipes.length !== 0 && props.recipes.length >= page && (
        <>
          <hr />
          <Accordion
            expanded={expand}
            onChange={toggleAccordion}
          >
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
              <Typography sx={{ color: 'white', fontSize: '1.5rem' }}>{props.mealName}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                backgroundColor: '#7ea1a8',
                border: 2,
                borderColor: '#506f8c'
              }}
            >
              <h3 onClick={handleOpen} className="header-link">
              {props.mealName}: {props.recipes[page - 1].name}
              </h3>
              <div>{props.recipes[page - 1].summary}</div>
              <Pagination
                count={props.recipes.length}
                page={page}
                onChange={handleChangePage}
                color="primary"
                className="center"
                style={{ marginTop: '1rem' }}
              />
              <RecipeModal
                open={open}
                handleClose={handleClose}
                recipe={props.recipes[page - 1]}
              ></RecipeModal>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  )
}
