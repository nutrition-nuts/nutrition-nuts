import { Client } from '@elastic/elasticsearch'
import { ELASTIC_URL } from '../config/constants'
import mock from './elastic-mock'

const client =
  process.env.NODE_ENV === 'test'
    ? new Client({
        node: ELASTIC_URL,
        Connection: mock.getConnection()
      })
    : new Client({
        node: ELASTIC_URL
      })

export default client
