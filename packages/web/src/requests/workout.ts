import { post } from './requests'
import { WorkoutModel } from '../models/workoutModels'

export const getWorkout = async(
  type: string,
  group: string,
  equip: string
) => {
  const res = await post('/workouts', { type, group, equip })
  const workout: WorkoutModel[][] = JSON.parse(JSON.stringify(res.data))
  return workout
}
