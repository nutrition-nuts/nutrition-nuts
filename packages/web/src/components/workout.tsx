import { WorkoutModel } from '../models/workoutModels'

interface Props {
  workout?: WorkoutModel
}

export default function Workout(props: Props) {
  return (
    <>
      {props.workout != null && (
        <div className="recipe-content">
          <h3>{props.workout.name}</h3>
          <p>{props.workout.force}</p>
          <p>{props.workout.level}</p>
        </div>
      )}
    </>
  )
}
