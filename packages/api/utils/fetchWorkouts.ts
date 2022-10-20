import elasticSearchClient from '../elastic/elastic-client'
export default async function fetchWorkouts(
  type: string,
  group: string,
  equip: string
) {
  const filterEquip =
    equip === 'off'
      ? 'body only'
      : 'barbell dumbell machine other bar cable bands'
  // console.log(filterEquip)
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      size: 12,
      query: {
        function_score: {
          boost: 1.5,
          functions: [
            {
              random_score: {}
            }
          ],
          boost_mode: 'sum',
          query: {
            bool: {
              should: [
                {
                  match: {
                    category: {
                      query: type
                    }
                  }
                },
                {
                  match: {
                    primaryMuscles: {
                      query: group
                    }
                  }
                }
              ],
              filter: [
                {
                  match: {
                    equipment: {
                      query: filterEquip
                    }
                  }
                }
              ]
            }
          }
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        size: 12
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }

  const hits2D = []
  while (hits.length) hits2D.push(hits.splice(0, 4))
  return hits2D
}
