import workoutData from '../data/excercises/exerciseslist.json'
import elasticSearchClient from '../elastic/elastic-client'
export default async function fetchWorkouts(keyword: string) {
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      query: {
        match: { name: keyword },
      },
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        query: {
          match: { name: 'shoulder' },
        },
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }
  return hits
}
