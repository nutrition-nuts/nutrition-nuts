import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import NavBar from '../components/navbar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { getInputFieldValue } from '../utils/genericUtils'
import Button from '@mui/material/Button'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>()
  const [workoutType, setWorkoutType] = useState('')
  const [muscleInput, setMuscleInput] = useState('')
  const [equipment, setEquipment] = useState('')

  const makeGetWorkoutRequest = async (query: string) => {
    return await getWorkout(query)
  }

  const onFindWorkoutsButtonClick = async () => {
    const type = await makeGetWorkoutRequest(workoutType)
    const group = await makeGetWorkoutRequest(muscleInput)
    const equip = await makeGetWorkoutRequest(equipment)

    setWorkouts([type[0], group[0], equip[0]])
  }

  return (
    <div className='App'>
      <NavBar />

      <div className='recipe-container'>
        <div className='recipe-item'>
          <h2>Workout Info</h2>

          <label htmlFor='workout-type'>Workout Type: </label>
          <input type='text' name='workout-type' onChange={(e) => setWorkoutType(getInputFieldValue(e))}/>
          <br />
          <label htmlFor='workout-group'>Muscle Group: </label>
          <input
            type='text'
            name='workout-group'
            onChange={(e) => setMuscleInput(getInputFieldValue(e))}
          />
          <br />
          <label htmlFor='workout-equipment'>Equipment: </label>
          <input type='checkbox' name='workout-equipment' onChange={(e) => setEquipment(e.target.checked ? 'on' : 'off')}/>
          <br />
          <br />
          <Button variant="contained" onClick={async () => await onFindWorkoutsButtonClick()}>
            Find me a workout!
          </Button>
        </div>
        <div className='recipe-item'>
          <h2>Workout Plan</h2>
          <Workout workout={workouts?.[0]}></Workout>
        </div>
      </div>
    </div>
  )
}
