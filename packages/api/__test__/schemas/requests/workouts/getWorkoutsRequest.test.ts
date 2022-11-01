import getWorkoutsRequest from '../../../../schemas/requests/getWorkoutsRequest'
import { invalidJson } from './invalidJson'
import { validJson } from './validJson'
import request from 'supertest'
import app from '../../../../app'

describe('Validate Get Recipes Request', () => {
  validJson.forEach((json) => {
    test('Valid Request', () => {
      expect(getWorkoutsRequest.validate(json)).toBeTruthy()
    })
  })
  invalidJson.forEach((json) => {
    test('Invalid Request', () => {
      expect(getWorkoutsRequest.validate(json)).toBeFalsy()
    })
  })
})

describe('E2E Server Tests for Valid and Invalid Workouts Requests', () => {
  validJson.forEach((json) => {
    test('Valid Request', async() => {
      const res = await request(app).post('/workouts').send(json)
      expect(res.statusCode).toEqual(200)
    })
  })
  invalidJson.forEach((json) => {
    test('Invalid Request', async() => {
      const res = await request(app).post('/workouts').send(json)
      expect(res.statusCode).toEqual(400)
    })
  })
})
