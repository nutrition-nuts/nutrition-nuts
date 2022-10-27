import express, { RequestHandler } from 'express'
import fetchWorkouts from '../utils/fetchWorkouts'
import getWorkoutsRequest from '../schemas/requests/getWorkoutsRequest'

const router = express.Router()

// POST /workouts
export const handleWorkoutsPost: RequestHandler = async (req, res, next) => {
  if (!getWorkoutsRequest.validate(req.body)) {
    return res.status(400).send()
  }

  const { type, group, equip } = req.body

  const hits = await fetchWorkouts(type, group, equip)

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
}
router.post('/', handleWorkoutsPost)

export default router
