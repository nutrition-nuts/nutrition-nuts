import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import Sidebar from '../components/sidebar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import {
  Button,
  FormControl,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material'
import StyledTextField from '../components/StyledTextField'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<WorkoutModel[][]>([])
  const [workoutType, setWorkoutType] = useState('')
  const [muscleInput, setMuscleInput] = useState('')
  const [equipment, setEquipment] = useState('off')

  const workoutTypes = [
    'Strength',
    'Stretching',
    'Cardio',
    'Plyometrics',
    'Powerlifting',
    'Strongman',
    'Olympic Weightlifting'
  ]

  const makeGetWorkoutRequest = async (
    type: string,
    group: string,
    equip: string
  ) => {
    return await getWorkout(type, group, equip)
  }

  const onFindWorkoutsButtonClick = async () => {
    const res = await makeGetWorkoutRequest(workoutType, muscleInput, equipment)
    // console.log(res)
    setWorkouts(res)
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="recipe-container">
        <div className="recipe-search">
          <h2 id="search-header">Workout Info</h2>
          <Box
            display="flex"
            style={{
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <StyledTextField
              id="workout-type"
              label="Workout Type"
              sx={{ m: 1, minWidth: 200 }}
              value={workoutType}
              onChange={(e) => {
                setWorkoutType(e.target.value)
              }}
              select
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {workoutTypes.map((type) => {
                return (
                  <MenuItem value={type.toLowerCase()} key={type}>
                    {type}
                  </MenuItem>
                )
              })}
            </StyledTextField>

            <StyledTextField
              id="muscle-group"
              value={muscleInput}
              label="Muscle Group"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={(e) => {
                setMuscleInput(e.target.value.replace(/[^a-z ]/gi, ''))
              }}
            ></StyledTextField>

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
                onClick={async () => await onFindWorkoutsButtonClick()}
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
