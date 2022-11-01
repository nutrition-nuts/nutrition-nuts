import { WorkoutModel } from '../models/workoutModels'
import Pagination from '@mui/material/Pagination'
import React, { useEffect, useState } from 'react'
import '../App.css'
import WorkoutSummary from './workoutSummary'
import { Grid } from '@mui/material'

interface Props {
  workouts: WorkoutModel[][]
}

export default function Workout(props: Props) {
  const [page, setPage] = useState(1)

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
          <div className="workout-flex-container">
            <Grid container direction="column" alignItems="center">
            {props.workouts[page - 1].map((workout) => {
              return (
                    <WorkoutSummary workout={workout} key={workout.name} />
              )
            })}
            </Grid>
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
        </>
      )}
    </>
  )
}
