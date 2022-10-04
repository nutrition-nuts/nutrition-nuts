import { RecipeModel } from '../models/recipeModels'
import { useEffect, useState } from 'react'
import RecipeModal from './recipeModal'
import Pagination from '@mui/material/Pagination'
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

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  useEffect(() => setPage(1), [props.recipes.length])

  return (
    <>
      {props.recipes.length !== 0 && props.recipes.length >= page && (
        <>
          <hr />
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
        </>
      )}
    </>
  )
}
