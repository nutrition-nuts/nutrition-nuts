import getRecipesRequest from '../../../../schemas/requests/getRecipesRequest'
import { invalidJson } from './invalidJson'
import { validJson } from './validJson'

describe('Validate Get Recipes Request', () => {
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
