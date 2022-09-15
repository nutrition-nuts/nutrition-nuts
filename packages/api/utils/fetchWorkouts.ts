import workoutData from '../data/excercises/exerciseslist.json' 
export default function fetchWorkouts (keyword: string) {
    const relevantWorkouts = workoutData.results.filter((workout) => {
    return workout.name.includes(keyword)
  })
  return relevantWorkouts
}
