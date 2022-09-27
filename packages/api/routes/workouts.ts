import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
const router = express.Router()

// GET /workouts
router.get('/', async(req, res, next) => {
  const { type, group, equip } = req.query

  // TODO: delete this. just an example of how to hit the elasticsearch from code
  const hits = await fetchWorkouts(String(type), String(group), String(equip))
  res.send(hits)
})

export default router
