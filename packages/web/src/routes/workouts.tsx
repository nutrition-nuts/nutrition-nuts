import { useState } from "react";
import "../App.css";
import "./workouts.css";
import { getWorkout } from "../requests/workout";
import NavBar from "../components/navbar";



function App() {
    const [message, setMessage] = useState("")

    const testRequest = async () => {
        const res = await getWorkout();

        setMessage(JSON.stringify(res.data) ?? "bad request")
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
                    <input type="text" name="workout-equipment" />
                    <br /><br />
                    <button onClick={testRequest}>Find me a workout!</button>
                </div>
                <div className="workout-item">
                    <h2>Workout Plan</h2>
                    <div>Response: {message}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
