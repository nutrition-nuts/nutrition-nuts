import express from 'express'
import elasticSearchClient from '../elastic/elastic-client'

const router = express.Router()

// GET /recipes
router.get('/', async (req, res, next) => {
  // TODO: delete this. just an example of how to hit the elasticsearch from code
  console.log(
    await elasticSearchClient
      .search({
        index: 'recipes',
        query: {
          query_string: {
            query: 'petite'
          }
        }
      })
      .then((value) => value.hits.hits[0] ?? '')
  )

  res.send({
    breakfast: {
      name: 'Eggs and Cheese',
      ingredients: ['2 eggs', 'shredded cheese']
    },
    lunch: {
      name: 'Chicken Sandwich',
      ingredients: ['one chicken breast', 'Burger Bun']
    },
    dinner: {
      name: 'Pasta Salad',
      ingredients: ['Orzo Pasta', 'Assortment of veggies', 'shredded parmesan']
    }
  })
})

export default router
