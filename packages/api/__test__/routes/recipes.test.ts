import naughtyStrings from '../naughty_strings.json'
import request from 'supertest'
import app from '../../app'
jest.useFakeTimers()

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('App listening at http://%s:%s', host, port);
// });

describe('Hit recipes endpoint with naughty strings', () => {
  naughtyStrings.forEach((naughtyString) => {
    // setTimeout(1)
    test(`Scary String: ${naughtyString}`, () => {
      const body = {
        query: naughtyString,
        allergies: [naughtyString, 'Eggs'],
        page: 1
      }

      request(app)
        .post('/recipes')
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
