export const invalidJson = [
  {
    query: 1,
    allergies: ['Eggs'],
    page: 1
  },
  {
    query: 'query',
    allergies: ['Eggs'],
    page: 0
  },
  {
    query: 'test',
    allergies: ['Eggs'],
    page: -2
  },
  {
    query: 'oatmeal',
    allergies: ['test', 1],
    page: 1
  },
  {
    query: 'oatmeal',
    allergies: 1.4,
    page: 1
  },
  {
    query: 'oatmeal',
    allergies: 1.4,
    page: 1
  },
  {
    query: 'oatmeal',
    allergies: ['test'],
    page: 1.2
  },
  {
    query: 'oatmeal🐸',
    allergies: ['test'],
    page: 1
  },
  {
    query: 'oatmeal',
    allergies: ['💩'],
    page: 1
  },
  {
    query: '><script>alert(123)</script>',
    allergies: ['test'],
    page: 1
  },
  {
    query: '><script>alert(123)</script>',
    allergies: ['test'],
    page: 1
  },
  {
    query:
      'ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็ ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็ ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็',
    allergies: ['test'],
    page: 1
  }
]
