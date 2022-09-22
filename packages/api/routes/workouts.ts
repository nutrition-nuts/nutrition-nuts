import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
const router = express.Router()

// GET /workouts
router.get('/', async(req, res, next) => {
  const { query } = req.query

  // TODO: delete this. just an example of how to hit the elasticsearch from code
  const hits = await fetchWorkouts(String(query))
  res.send(hits)
})

export default router
