import { WorkoutModel } from '../models/workoutModels'
import WorkoutModal from './workoutModal'
import React, { useState } from 'react'
import '../App.css'
interface Props {
  workout: WorkoutModel
}

export default function WorkoutSummary(props: Props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className="recipe-content">
        <h3 onClick={handleOpen} className="header-link">
          {props.workout.name}
        </h3>
        <p className={'caps'}>Type: {props.workout.category}</p>
        <p className={'caps'}>
          Equipment Needed: {props.workout.equipment}
        </p>
        <p className={'caps'}>Level: {props.workout.level}</p>
        <p className={'caps'}>
          Primary Muscles: {props.workout.primaryMuscles[0]}
        </p>
      </div>
      <WorkoutModal
          open={open}
          handleClose={handleClose}
          workout={props.workout}
      ></WorkoutModal>
    </>
  )
}
