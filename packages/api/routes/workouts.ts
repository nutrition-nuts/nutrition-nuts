import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
const router = express.Router()

// GET /workouts
router.get('/', async(req, res) => {
  const { type, group, equip } = req.query

  const hits = await fetchWorkouts(String(type), String(group), String(equip))

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
})
export default router
