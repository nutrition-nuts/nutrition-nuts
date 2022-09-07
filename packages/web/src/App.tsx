import { useState } from "react";
import "./App.css";
import { getTest } from "./requests/test";
import NavBar from "./components/navbar";



function App() {
  const [message, setMessage] = useState("")

  const testRequest = async () => {
    const res = await getTest();

    setMessage(JSON.stringify(res.data) ?? "bad request")
  };


  return (
    <div className="App">
      <NavBar />

      <header className="App-header">
        <button onClick={testRequest}>Fetch from API</button>
        <div>Response: {message}</div>
      </header>
    </div>
  );
}

export default App;
