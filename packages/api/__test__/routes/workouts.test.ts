import request from 'supertest'
import app from '../../app'
import getWorkoutsRequest from '../../schemas/requests/getWorkoutsRequest'
import naughtyStrings from '../naughty_strings.json'

describe('Hit workouts endpoint with naughty strings', () => {
  naughtyStrings.forEach((naughtyString) => {
    test('Scary String', async() => {
      const body = {
        type: naughtyString,
        group: naughtyString,
        equip: 'off'
      }

      const res = await request(app).post('/workouts').send(body)

      const expectedStatus = getWorkoutsRequest.validate(body) ? 200 : 400

      expect(res.statusCode).toEqual(expectedStatus)
    })
  })
})
