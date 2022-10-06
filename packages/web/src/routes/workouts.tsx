import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import { getVideo } from '../requests/youtubeSearch'
import NavBar from '../components/navbar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { getInputFieldValue } from '../utils/genericUtils'
import Button from '@mui/material/Button'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([])
  const [workoutType, setWorkoutType] = useState('')
  const [muscleInput, setMuscleInput] = useState('')
  const [equipment, setEquipment] = useState('off')

  const makeGetWorkoutRequest = async(type: string, group: string, equip: string) => {
    return await getWorkout(type, group, equip)
  }

  const makeGetVideoRequest = async(q: string) => {
    return await getVideo(q, 'AIzaSyCiNPs-gp2BM_4Hxd6KSghqq6Dw-3c_-88')
  }

  const onFindWorkoutsButtonClick = async() => {
    const res = await makeGetWorkoutRequest(workoutType, muscleInput, equipment)

    await Promise.all(res.map(async(result) => {
      result.video = await makeGetVideoRequest(result.name)
    }))

    setWorkouts(res)
  }

  return (
    <div className="App">
      <NavBar />

      <div className="recipe-container">
        <div className="recipe-item">
          <h2>Workout Info</h2>

          <label htmlFor='workout-type'>Workout Type: </label>
          <input type='text' name='workout-type' onChange={(e) => setWorkoutType(getInputFieldValue(e))}/>
          <br />
          <label htmlFor="workout-group">Muscle Group: </label>
          <input
            type="text"
            name="workout-group"
            onChange={(e) => setMuscleInput(getInputFieldValue(e))}
          />
          <br />
          <label htmlFor='workout-equipment'>Equipment: </label>
          <input type='checkbox' name='workout-equipment' onChange={(e) => setEquipment(e.target.checked ? 'on' : 'off')}/>
          <br />
          <br />
          <Button variant="contained" onClick={async() => await onFindWorkoutsButtonClick()}>
            Find me a workout!
          </Button>
        </div>
        <div className="recipe-item">
          <h2>Workout Plan</h2>
          <Workout workouts={workouts}></Workout>
        </div>
      </div>
    </div>
  )
}
