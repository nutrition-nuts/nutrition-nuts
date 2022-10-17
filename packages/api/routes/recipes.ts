import express from 'express'
import elasticSearchClient from '../elastic/elastic-client'
import { allergyThesaurus } from '../thesaurus'

const router = express.Router()

// GET /recipes
router.get('/', async(req, res, next) => {
  // debugger;
  // const fr = new FileReader()
  // fr.readAsText(new File([], '../thesaurus.json'))
  // const thesaurus = JSON.parse(String(fr.result))
  const allergies = JSON.parse(String(req.query.allergies))
  for(let i = 0; i < allergies.length; i++) {
    allergies[i] = allergyThesaurus[allergies[i] as keyof typeof String]
  }
  let filters = []
  for(let i = 0; i < allergies.length; i++) {
    for(let j = 0; j < allergies[i].length; j++) {
      filters.push({ match: { message: {query: allergies[i][j], fuzziness: 1}}})
    }
  } 
  // TODO: delete this. just an example of how to hit the elasticsearch from code
  let hits = await elasticSearchClient
    .search({ 
      index: 'recipes',
      query: {
        bool: {
          must: [
            {
              match: { category: 'main-dish' }
            },
            {
              query_string: {
                query: String(req.query.query)
              }
            }
          ],
          must_not: filters
          // [
          //   { match: { ingredients: allergies } }
          // ]
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

    let found_stuff = (hits.length > 0)
  // default case, give at least something back
  if (!found_stuff) {
    hits = await elasticSearchClient
      .search({
        index: 'recipes',
        size: 10,
        query: {
          function_score: {
            boost: 5,
            functions: [
              {
                random_score: {}
              }
            ],
            boost_mode: 'multiply',
            query: {
              bool: {
                must: [
                  {
                    match: { category: 'main-dish' }
                  }
                ],
                must_not: [
                  { match: { ingredients: String(req.query.allergies) } }
                ]
              }
            }
          }
        }
      })
      .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])
  }

  res.send({hits, found_stuff})
})

export default router
