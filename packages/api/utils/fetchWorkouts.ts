import elasticSearchClient from '../elastic/elastic-client'
export default async function fetchWorkouts(
  type: string,
  group: string,
  equip: string
) {
  const filterEquip =
    equip === 'off'
      ? 'body only'
      : 'barbell cable kettlebells machine exercise ball dumbbell e-z curl bar other foam roll bands medicine ball'
  // console.log(filterEquip)
  let hits = await elasticSearchClient
    .search({
      index: 'workouts',
      size: 5,
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
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  // default case, give at least something back
  if (hits.length === 0) {
    hits = await elasticSearchClient
      .search({
        index: 'workouts',
        size: 1
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }
  return hits
}
