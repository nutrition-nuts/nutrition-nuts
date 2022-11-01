import getRecipesRequest from '../../../../schemas/requests/getRecipesRequest'
import { invalidJson } from './invalidJson'
import { validJson } from './validJson'
import request from 'supertest'
import app from '../../../../app'

describe('Test Validate Get Recipes Request', () => {
  validJson.forEach((json) => {
    test('Valid Request', () => {
      expect(getRecipesRequest.validate(json)).toBeTruthy()
    })
  })
  invalidJson.forEach((json) => {
    test('Invalid Request', () => {
      expect(getRecipesRequest.validate(json)).toBeFalsy()
    })
  })
})

describe('E2E Server Tests for Valid and Invalid Recipes Requests', () => {
  validJson.forEach((json) => {
    test('Valid Request', async () => {
      const res = await request(app).post('/recipes').send(json)
      expect(res.statusCode).toEqual(200)
    })
  })
  invalidJson.forEach((json) => {
    test('Invalid Request', async () => {
      const res = await request(app).post('/recipes').send(json)
      expect(res.statusCode).toEqual(400)
    })
  })
})
