import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv()

interface GetRecipesRequest {
  query: string
  allergies: string[]
  page: number
}

const schema: JSONSchemaType<GetRecipesRequest> = {
  type: 'object',
  properties: {
    query: { type: 'string', nullable: false },
    allergies: { type: 'array', items: { type: 'string' } },
    page: { type: 'integer', minimum: 1 }
  },

  required: ['allergies', 'page', 'query'],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default { validate }
