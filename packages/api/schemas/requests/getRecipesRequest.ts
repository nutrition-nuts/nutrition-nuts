import Ajv, { JSONSchemaType } from 'ajv'
import { alphaNumericPattern } from '../constants'
const ajv = new Ajv()

interface GetRecipesRequest {
  query: string
  allergies: string[]
  page: number
}

const schema: JSONSchemaType<GetRecipesRequest> = {
  type: 'object',
  properties: {
    query: { type: 'string', nullable: false, pattern: alphaNumericPattern },
    allergies: {
      type: 'array',
      items: { type: 'string', pattern: alphaNumericPattern }
    },
    page: { type: 'integer', minimum: 1 }
  },

  required: ['allergies', 'page', 'query'],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default { validate }
