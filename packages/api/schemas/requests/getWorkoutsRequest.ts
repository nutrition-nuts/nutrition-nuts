import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv()

interface GetWorkoutsRequest {
  type: string
  group: string
  equip: string
}

const schema: JSONSchemaType<GetWorkoutsRequest> = {
  type: 'object',
  properties: {
    type: { type: 'string', nullable: false },
    group: { type: 'string', nullable: false },
    equip: { type: 'string', nullable: false, pattern: '^off$|^on$' }
  },

  required: ['type', 'group', 'equip'],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export default { validate }
