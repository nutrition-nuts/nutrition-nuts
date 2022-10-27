import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
import getWorkoutsRequest from '../schemas/requests/getWorkoutsRequest.js'

const router = express.Router()

// POST /workouts
router.post('/', async(req, res) => {
  if (!getWorkoutsRequest.validate(req.body)) {
    return res.status(400).send()
  }

  const { type, group, equip } = req.body

  const hits = await fetchWorkouts(type, group, equip)

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
})
export default router
