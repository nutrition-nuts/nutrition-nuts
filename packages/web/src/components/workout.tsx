import { WorkoutModel } from '../models/workoutModels'
import Pagination from '@mui/material/Pagination'
import WorkoutModal from './workoutModal'
import React, { useEffect, useState } from 'react'
import '../App.css'

interface Props {
  workouts: WorkoutModel[]
}

export default function Workout(props: Props) {
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

  useEffect(() => setPage(1), [props.workouts.length])

  return (
    <>
      {props.workouts.length !== 0 && props.workouts.length >= page && (
        <>
          <div className="recipe-content">
            <h3 onClick={handleOpen} className="header-link">
              {props.workouts[page - 1].name}
            </h3>
            <p className={'caps'}>Type: {props.workouts[page - 1].category}</p>
            <p className={'caps'}>
              Equipment Needed: {props.workouts[page - 1].equipment}
            </p>
            <p className={'caps'}>Level: {props.workouts[page - 1].level}</p>
            <p className={'caps'}>
              Primary Muscles: {props.workouts[page - 1].primaryMuscles[0]}
            </p>
          </div>
          <Pagination
            count={props.workouts.length}
            page={page}
            onChange={handleChangePage}
            color="primary"
            className="center"
            style={{ marginTop: '1rem' }}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white'
              }
            }}
          />
          <WorkoutModal
            open={open}
            handleClose={handleClose}
            workout={props.workouts[page - 1]}
          ></WorkoutModal>
        </>
      )}
    </>
  )
}
