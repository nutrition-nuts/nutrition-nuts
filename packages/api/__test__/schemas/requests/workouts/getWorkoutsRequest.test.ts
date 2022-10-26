import getWorkoutsRequest from '../../../../schemas/requests/getWorkoutsRequest'
import { invalidJson } from './invalidJson'
import { validJson } from './validJson'

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
