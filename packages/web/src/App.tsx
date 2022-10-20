import { Button, Grid, Typography } from '@mui/material'
import './App.css'
import Sidebar from './components/sidebar'
import heroImage from './images/recipe-book-hero.png'

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <h1 id="app-hero">Nutrition Nuts 🌰</h1>
          <Typography color={'secondary'} fontSize="2rem">
            Recipes & Workouts for a Healthier You
          </Typography>
          <Button
            href="/profile"
            variant="contained"
            style={{ margin: '1rem' }}
          >
            Profile
          </Button>
          <Button
            href="/profile"
            variant="contained"
            style={{ margin: '1rem' }}
          >
            Recipes
          </Button>
          <Button
            href="/workouts"
            variant="contained"
            style={{ margin: '1rem' }}
          >
            Workouts
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img id="hero-image" src={heroImage} />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
