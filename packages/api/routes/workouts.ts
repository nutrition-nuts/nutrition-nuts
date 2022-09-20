import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
import elasticSearchClient from '../elastic/elastic-client'
const router = express.Router()

// GET /workouts/:bodyTarget
router.get('/:bodyTarget', async (req, res, next) => {
  // TODO: delete this. just an example of how to hit the elasticsearch from code
  let query = req.params.bodyTarget
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      query: {
        query_string: {
          query: String(query) ?? 'press',
        },
      },
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        query: {
          query_string: {
            query: 'bell',
          },
        },
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }

  res.send(hits)

  // res.send({
  //   name: hits[0].name,
  //   description: workoutData[0].description,
  // })
})

export default router
