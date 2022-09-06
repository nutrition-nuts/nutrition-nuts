import {get} from './requests'

export const getWorkout = async () => {
  return await get('/workouts');
}
