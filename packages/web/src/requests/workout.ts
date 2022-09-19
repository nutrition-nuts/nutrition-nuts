import { get } from './requests'
import { WorkoutModel } from '../models/workoutModels'

export const getWorkout = async (muscleGroup: string) => {
  const res = await get(`/workouts/${muscleGroup}`)
  const workout: WorkoutModel = JSON.parse(JSON.stringify(res.data))
  return workout
}
