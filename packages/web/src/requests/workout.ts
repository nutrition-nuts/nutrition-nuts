import { get } from './requests'
import { WorkoutModel } from '../models/workoutModels'

export const getWorkout = async(query: string) => {
  const res = await get('/workouts', { query })
  const workout: WorkoutModel[] = JSON.parse(JSON.stringify(res.data))
  return workout
}
