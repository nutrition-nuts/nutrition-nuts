import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Workouts from './routes/workouts'
import { Profile } from './routes/profile'
import Nutrition from './routes/nutrition'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/materialUiTheme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="profile" element={<Profile />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
