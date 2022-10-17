import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import Sidebar from '../components/sidebar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel, Box } from '@mui/material'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([])
  const [workoutType, setWorkoutType] = useState('')
  const [muscleInput, setMuscleInput] = useState('')
  const [equipment, setEquipment] = useState('off')

  const workoutTypes = ['Strength', 'Stretching', 'Cardio', 'Plyometrics', 'Powerlifting', 'Strongman', 'Olympic Weightlifting']

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
        <div className="recipe-search">
          <h2 id="search-header">Workout Info</h2>
          <Box display="flex" style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                  return <MenuItem value={type.toLowerCase()} key={type}>{type}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <TextField
                  id="muscle-group"
                  value={muscleInput}
                  label="Muscle Group"
                  variant="outlined"
                  onChange={(e) => {
                    setMuscleInput(e.target.value)
                  }}
              ></TextField>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      setEquipment(e.target.checked ? 'on' : 'off')
                    }}
                    style={{
                      color: '#506f8c'
                    }}
                  />
                }
                label="Equipment?"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <Button
                variant="contained"
                onClick={async() => await onFindWorkoutsButtonClick()}
                style={{
                  background: '#506f8c'
                }}
              >
                Find me a workout!
              </Button>
            </FormControl>
          </Box>
        </div>
        <div className="recipe-item">
          <h2>Workout Plan</h2>
          <Workout workouts={workouts}></Workout>
        </div>
      </div>
    </div>
  )
}
