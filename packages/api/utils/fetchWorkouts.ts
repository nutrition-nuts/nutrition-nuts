import workoutData from "../../elastic-search/data/excercises/exerciseslist.json";
export default function fetchWorkouts(keyword: number) {
  console.log(workoutData);
  return workoutData;
}
