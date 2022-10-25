import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
const router = express.Router()

// POST /workouts
router.post('/', async (req, res) => {
  console.log(req.body)
  const { type, group, equip } = req.body

  const hits = await fetchWorkouts(String(type), String(group), String(equip))

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
})
export default router
