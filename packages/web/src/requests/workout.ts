import {get} from './requests'
import { WorkoutModel } from '../models/workoutModels';



export const getWorkout = async () => {
  const res = await get('/workouts');
  const workout: WorkoutModel = JSON.parse(JSON.stringify(res.data));
  return workout;
}
