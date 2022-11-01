import { useState } from 'react'
import '../App.css'
import './nutrition.css'
import { getWorkout } from '../requests/workout'
import Sidebar from '../components/sidebar'
import Workout from '../components/workout'
import { WorkoutModel } from '../models/workoutModels'
import { Grid, Button, FormControl, MenuItem, Checkbox, FormControlLabel } from '@mui/material'
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

  const makeGetWorkoutRequest = async(
    type: string,
    group: string,
    equip: string
  ) => {
    return await getWorkout(type, group, equip)
  }

  const onFindWorkoutsButtonClick = async() => {
    const res = await makeGetWorkoutRequest(workoutType, muscleInput, equipment)
    // console.log(res)
    setWorkouts(res)
  }

  return (
    <div className="App">
      <Sidebar />
      <div className="recipe-container">
        <div className = "recipe-search">
        <h2 id="search-header">Workout Info</h2>
        <Grid container direction ="row" alignItems="stretch" justifyContent="space-around">
              <Grid item xs={12} md={3}>
                <StyledTextField
                    id="workout-type"
                    label="Workout Type"
                    sx={{ m: 1, minWidth: 210 }}
                    value={workoutType}
                    onChange={(e) => {
                      setWorkoutType(e.target.value)
                    }}
                    InputProps={{
                      style: {
                        color: 'white'
                      }
                    }}
                    select
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {workoutTypes.map((type) => {
                    return <MenuItem value={type.toLowerCase()} key={type}>{type}</MenuItem>
                  })}
                </StyledTextField>
              </Grid>
              <Grid item xs={12} md={3}>
                  <StyledTextField
                      id="muscle-group"
                      value={muscleInput}
                      label="Muscle Group"
                      variant="outlined"
                      sx={{ m: 1, minWidth: 210 }}
                      onChange={(e) => {
                        setMuscleInput(e.target.value.replace(/[^a-z ]/gi, ''))
                      }}
                      InputProps={{
                        style: {
                          color: 'white'
                        }
                      }}
                  ></StyledTextField>
              </Grid>
              <Grid item xs={12} md={2} >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => {
                          setEquipment(e.target.checked ? 'on' : 'off')
                        }}
                        style={{
                          color: '#617c93'
                        }}
                      />
                    }
                    label="Equipment?"
                  />
              </FormControl>
            </Grid>
            <Grid item xs={12} md= {3}>
              <FormControl sx={{ m: 1 }}>
                <Button
                  variant="contained"
                  onClick={async() => await onFindWorkoutsButtonClick()}
                >
                  Find me a workout!
                </Button>
              </FormControl>
            </Grid>
        </Grid>
        </div>
        <div className="recipe-item">
          <h2>Workout Plan</h2>
          <Workout workouts={workouts}></Workout>
        </div>
      </div>
    </div>
  )
}
