import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types'
import express from 'express'
import elasticSearchClient from '../elastic/elastic-client'
import { allergyThesaurus } from '../thesaurus'

const router = express.Router()

const PAGE_SIZE = 5

// GET /recipes
router.get('/', async (req, res, next) => {
  if (
    req.query.page &&
    (!Number(req.query.page) || Number(req.query.page) < 1)
  ) {
    return res.status(400).send()
  }
  const page = Number(req.query.page ?? 0)

  const allergies = JSON.parse(String(req.query.allergies))
  for (let i = 0; i < allergies.length; i++) {
    allergies[i] = allergyThesaurus[allergies[i] as keyof typeof String]
  }
  const filters: QueryDslQueryContainer[] = []
  for (let i = 0; i < allergies.length; i++) {
    for (let j = 0; j < allergies[i].length; j++) {
      filters.push({
        match: { ingredients: { query: allergies[i][j], fuzziness: 1 } }
      })
    }
  }
  let hits = await elasticSearchClient
    .search({
      index: 'recipes',
      from: (page - 1) * PAGE_SIZE,
      size: PAGE_SIZE,
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  { match: { category: 'breakfast-and-brunch' } },
                  { match: { category: 'main-dish' } }
                ]
              }
            },
            {
              query_string: {
                query: String(req.query.query),
                fields: ['name^2.0', 'ingredients']
              }
            }
          ],
          must_not: filters
        }
      }
    })
    .then((value) => value.hits.hits.map((hit) => hit._source) ?? [])

  const foundStuff = hits.length > 0
  // default case, give at least something back
  if (!foundStuff) {
    hits = await elasticSearchClient
      .search({
        index: 'recipes',
        size: PAGE_SIZE,
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

  res.send([hits, foundStuff])
})

export default router
