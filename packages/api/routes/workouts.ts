import express, { RequestHandler } from 'express'
import { fetchWorkouts, getWorkouts } from '../utils/fetchWorkouts'
import getWorkoutsRequest from '../schemas/requests/getWorkoutsRequest'
import postWorkoutsRequest from '../schemas/requests/postWorkoutsRequest'

const router = express.Router()

// POST /workouts
export const handleWorkoutsPost: RequestHandler = async(req, res, next) => {
  if (!postWorkoutsRequest.validate(req.body)) {
    return res.status(400).send()
  }

  const { type, group, equip } = req.body

  const hits = await fetchWorkouts(type, group, equip)

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
}
router.post('/', handleWorkoutsPost)

// GET /workouts
export const handleWorkoutsGet: RequestHandler = async(req, res, next) => {
  debugger
  if (!getWorkoutsRequest.validate(req.body)) {
    return res.status(400).send()
  }

  const { query } = req.body

  const hits = await getWorkouts(query)

  const workout = JSON.parse(JSON.stringify(hits))
  res.send(workout)
}
router.get('/', handleWorkoutsGet)

export default router
