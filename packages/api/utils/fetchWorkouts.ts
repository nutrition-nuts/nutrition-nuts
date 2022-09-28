import elasticSearchClient from '../elastic/elastic-client'
export default async function fetchWorkouts(
  type: string,
  group: string,
  equip: string
) {
  let filterEquip = equip === 'off' ? 'body only' : ''
  console.log(filterEquip)
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      query: {
        term: {
          primaryMuscles: group
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        query: {
          match: { name: 's' }
        }
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }
  return hits
}
