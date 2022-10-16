import { useState } from 'react'
import './App.css'
import { getTest } from './requests/test'
import Sidebar from './components/sidebar'

function App() {
  const [message, setMessage] = useState('')

  const testRequest = async() => {
    const res = await getTest()

    // super hacky. ideally the backend will do this nonsense and send us a format we expect. just for the test endpoint
    setMessage(
      JSON.stringify(res?.data?.data[0]) ??
        'bad request. Make sure server is running!'
    )
  }

  return (
    <div className="App">
      <Sidebar />

      <header className="App-header">
        <h1>Home page that might have cool stuff on it eventually</h1>
        <button onClick={testRequest}>Fetch from backend API</button>
        <div className="message">{message}</div>
      </header>
    </div>
  )
}

export default App
