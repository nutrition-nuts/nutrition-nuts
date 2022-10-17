import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import Sidebar from '../components/sidebar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel } from '@mui/material'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([])
  const [workoutType, setWorkoutType] = useState('')
  const [muscleInput, setMuscleInput] = useState('')
  const [equipment, setEquipment] = useState('off')

  const workoutTypes = ['plyometrics', 'cardio', 'stretching', 'olympic weightlifting', 'strongman', 'strength', 'powerlifting']

  const makeGetWorkoutRequest = async(type: string, group: string, equip: string) => {
    return await getWorkout(type, group, equip)
  }

  const onFindWorkoutsButtonClick = async() => {
    const res = await makeGetWorkoutRequest(workoutType, muscleInput, equipment)
    console.log(res)
    setWorkouts(res)
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="recipe-container">
        <div className="recipe-item">
          <h2>Workout Info</h2>

          <FormControl sx={{ m: 1, minWidth: 200 }} style={{ textAlign: 'center' }}>
            <InputLabel id="workout-type-label">Workout Type</InputLabel>
            <Select
                labelId="workout-type-label"
                id="workout-type"
                value={workoutType}
                label="Workout Type"
                onChange={(e) => {
                  setWorkoutType(e.target.value)
                }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workoutTypes.map((type) => {
                return <MenuItem value={type} key={type}>{type}</MenuItem>
              })}
            </Select>
            <br />
            <TextField
                id="muscle-group"
                value={muscleInput}
                label="Muscle Group"
                variant="outlined"
                onChange={(e) => {
                  setMuscleInput(e.target.value)
                }}
            ></TextField>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setEquipment(e.target.checked ? 'on' : 'off')
                  }}
                />
              }
              label="Equipment?"
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            />
            <br />
            <Button variant="contained" onClick={async() => await onFindWorkoutsButtonClick()}>
              Find me a workout!
            </Button>
          </FormControl>
        </div>
        <div className="recipe-item">
          <h2>Workout Plan</h2>
          <Workout workouts={workouts}></Workout>
        </div>
      </div>
    </div>
  )
}
