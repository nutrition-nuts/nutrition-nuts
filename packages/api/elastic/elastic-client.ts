import { Client } from '@elastic/elasticsearch'
import { ELASTIC_URL } from '../config/constants'

const client = new Client({
  node: ELASTIC_URL
})

export default client
