import express from 'express'
import fetchWorkouts from '../utils/fetchWorkouts.js'
import fetch from 'node-fetch'
import { YOUTUBE_API_KEY } from '../config/constants'
const router = express.Router()

// GET /workouts
router.get('/', async(req, res) => {
  const { type, group, equip } = req.query

  // TODO: delete this. just an example of how to hit the elasticsearch from code
  const hits = await fetchWorkouts(String(type), String(group), String(equip))

  const workout = JSON.parse(JSON.stringify(hits))

  await Promise.all(
    workout.map(async(result: any) => {
      const vidRes = await fetch(
        'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how to do ' +
          result.name +
          ' workout&key=' +
          YOUTUBE_API_KEY
      )
      const requestJSON = await vidRes.json()
      const it0 = requestJSON.items[0]
      result.videoID = it0.id.videoId
    })
  )

  res.send(workout)
})

export default router
