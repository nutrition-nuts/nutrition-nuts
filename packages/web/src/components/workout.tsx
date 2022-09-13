import { WorkoutModel } from "../models/workoutModels";

type Props = {
  workout?: WorkoutModel;
};

export default function Workout(props: Props) {
  return (
    <>
      {props.workout && (
        <div className="recipe-content">
          <h3>{props.workout.name}</h3>
          <img src={props.workout.image} />
          <p>{props.workout.description}</p>
        </div>
      )}
    </>
  );
}
