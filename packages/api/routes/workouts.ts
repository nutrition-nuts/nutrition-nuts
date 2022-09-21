import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
import elasticSearchClient from '../elastic/elastic-client'
const router = express.Router()

// GET /workouts/:bodyTarget
router.get('/:bodyTarget', async (req, res, next) => {
  // TODO: delete this. just an example of how to hit the elasticsearch from code
  let query = req.params.bodyTarget
  let hits = await fetchWorkouts(query)
  res.send(hits)
})

export default router
