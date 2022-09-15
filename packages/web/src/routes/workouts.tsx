import { useState } from "react";
import "../App.css";
import "./workouts.css";
import { getWorkout } from "../requests/workout";
import NavBar from "../components/navbar";

function App() {
  const [message, setMessage] = useState("");

  const workoutRequest = async () => {
    const res = await getWorkout("Triceps");
    if (res.status === 200) {
      setMessage(
        "<h3>" + res.data.name + "</h3><p>" + res.data.description + "</p>"
      );
    } else {
      setMessage("bad request");
    }
  };

  return (
    <div className="App">
      <NavBar />

      <div className="workout-container">
        <div className="workout-item">
          <h2>Workout Info</h2>

          <label htmlFor="workout-type">Workout Type: </label>
          <input type="text" name="workout-type" />
          <br />
          <label htmlFor="workout-group">Muscle Group: </label>
          <input type="text" name="workout-group" />
          <br />
          <label htmlFor="workout-equipment">Equipment: </label>
          <input type="checkbox" name="workout-equipment" />
          <br />
          <br />
          <button onClick={workoutRequest}>Find me a workout!</button>
        </div>
        <div className="workout-item">
          <h2>Workout Plan</h2>
          <div
            className="workout-content"
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
