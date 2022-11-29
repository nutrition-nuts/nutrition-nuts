import Ajv, { JSONSchemaType } from 'ajv'
import { alphaNumericPattern } from '../constants'
const ajv = new Ajv()

interface GetWorkoutsRequest {
  query: string
}

const schema: JSONSchemaType<GetWorkoutsRequest> = {
  type: 'object',
  properties: {
    query: { type: 'string', nullable: false, pattern: alphaNumericPattern },
  },

  required: ['query'],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default { validate }