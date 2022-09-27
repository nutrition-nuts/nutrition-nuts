import { WorkoutModel } from '../models/workoutModels'
import Pagination from '@mui/material/Pagination'
import React, { useEffect, useState } from 'react'

interface Props {
  workouts: WorkoutModel[]
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
            <div className="recipe-content">
              <h3>{props.workouts[page - 1].name}</h3>
              <p>Level: {props.workouts[page - 1].level}</p>
              <p>
                <h4>Primary Muscles:</h4>
                <ul>
                  {props.workouts[page - 1].primaryMuscles.map(function(object, i) {
                    return <li key={i}>{object}</li>
                  })}
                </ul>
              </p>
              <p>
                <h4>Secondary Muscles:</h4>
                <ul>
                  {props.workouts[page - 1].secondaryMuscles.map(function(object, i) {
                    return <li key={i}>{object}</li>
                  })}
                </ul>
              </p>
              <p>
                {props.workouts[page - 1].instructions}
              </p>
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
