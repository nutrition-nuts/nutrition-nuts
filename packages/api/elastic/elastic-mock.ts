import Mock from '@elastic/elasticsearch-mock'

const mock = new Mock()

mock.add(
  {
    method: 'GET',
    path: '/_cat/health'
  },
  () => {
    return { status: 'TESTTEST' }
  }
)

mock.add(
  {
    method: 'POST',
    path: '/:index/_search'
  },
  () => {
    return {
      hits: {
        total: { value: 0, relation: 'eq' },
        hits: [
          {
            _source: 'TESTTEST'
          }
        ]
      }
    }
  }
)

export default mock
