import elasticSearchClient from '../elastic/elastic-client'

const EQUIP = 'barbell cable kettlebells machine exercise ball dumbbell e-z curl bar other foam roll bands medicine ball'

async function fetchWorkouts(
  type: string,
  group: string,
  equip: string
) {
  const filterEquip =
    equip === 'off'
      ? 'body only'
      : EQUIP
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
  while (hits.length > 0) hits2D.push(hits.splice(0, 4))
  return hits2D
}

async function getWorkouts(
  query: string
) {
  // console.log(filterEquip)
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: String(query)
              }
            }
          ],
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }

  return hits[0]
}

export { fetchWorkouts, getWorkouts }