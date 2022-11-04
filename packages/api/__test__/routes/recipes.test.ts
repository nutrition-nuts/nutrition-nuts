import naughtyStrings from '../naughty_strings.json'
import request from 'supertest'
import app from '../../app'
import getRecipesRequest from '../../schemas/requests/getRecipesRequest'

describe('Hit recipes endpoint with naughty strings', () => {
  naughtyStrings.forEach((naughtyString) => {
    test('Scary String', async () => {
      const body = {
        query: naughtyString,
        allergies: [naughtyString, 'eggs'],
        page: 1
      }

      const res = await request(app).post('/recipes').send(body)

      const expectedStatus = getRecipesRequest.validate(body) ? 200 : 400

      expect(res.statusCode).toEqual(expectedStatus)
    })
  })
})
