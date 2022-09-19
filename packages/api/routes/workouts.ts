import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
const router = express.Router()

// GET /workouts/:bodyTarget
router.get('/:bodyTarget', (req, res, next) => {
  const workoutData = fetchWorkouts(req.params.bodyTarget)
  console.log(workoutData)
  res.send({
    name: workoutData[0].name,
    description: workoutData[0].description
  })
})

export default router
