import { get } from './requests'

export const getWorkout = async (muscleGroup: string) => {
  return await get(`/workouts/${muscleGroup}`)
}
