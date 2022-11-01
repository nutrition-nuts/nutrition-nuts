import naughtyStrings from '../naughty_strings.json'
import request from 'supertest'
import app from '../../app'

describe('Hit recipes endpoint with naughty strings', () => {
  naughtyStrings.forEach((naughtyString) => {
    test(`Scary String ${naughtyString}`, async () => {
      const body = {
        query: naughtyString,
        allergies: [naughtyString, 'eggs'],
        page: 1
      }

      const res = await request(app).post('/recipes').send(body)

      expect(res.statusCode).toEqual(200)
    })
  })
})
