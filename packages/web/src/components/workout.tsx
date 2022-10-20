import { WorkoutModel } from '../models/workoutModels'
import Pagination from '@mui/material/Pagination'
import React, { useEffect, useState } from 'react'
import '../App.css'
import WorkoutSummary from './workoutSummary'

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
            {props.workouts[page - 1].map((workout) => {
              return (
                  <WorkoutSummary workout={workout} key={workout.name} />
              )
            })}
          </div>
          <Pagination
            count={props.workouts.length}
            page={page}
            onChange={handleChangePage}
            color="primary"
            className="center"
            style={{ marginTop: '1rem' }}
          />
        </>
      )}
    </>
  )
}
