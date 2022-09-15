import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import NavBar from '../components/navbar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { getInputFieldValue } from '../utils/genericUtils'

export default function Workouts () {
  const [workout, setWorkout] = useState<WorkoutModel>()
  const [muscleInput, setMuscleInput] = useState('')

  const workoutRequest = async (query: string) => {
    const res = await getWorkout(query)
    setWorkout(res)
  }

  return (
    <div className="App">
      <NavBar />

      <div className="recipe-container">
        <div className="recipe-item">
          <h2>Workout Info</h2>

          <label htmlFor="workout-type">Workout Type: </label>
          <input type="text" name="workout-type" />
          <br />
          <label htmlFor="workout-group">Muscle Group: </label>
          <input
            type="text"
            name="workout-group"
            onChange={(e) => setMuscleInput(getInputFieldValue(e))}
          />
          <br />
          <label htmlFor="workout-equipment">Equipment: </label>
          <input type="checkbox" name="workout-equipment" />
          <br />
          <br />
          <button onClick={async () => await workoutRequest(muscleInput)}>
            Find me a workout!
          </button>
        </div>
        <div className="recipe-item">
          <h2>Workout Plan</h2>
          <Workout workout={workout}></Workout>
        </div>
      </div>
    </div>
  )
}
