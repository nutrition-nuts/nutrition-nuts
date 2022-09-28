import elasticSearchClient from '../elastic/elastic-client'
export default async function fetchWorkouts(
  type: string,
  group: string,
  equip: string
) {
  const filterEquip = equip === 'off' ? 'body only' : ''
  console.log(filterEquip)
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: group
              }
            }
          ],
          filter: [
            {
              match: {
                equipment: filterEquip
              }
            }
          ]
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        size: 10
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }
  return hits
}
