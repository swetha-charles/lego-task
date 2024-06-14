const app = require('./app');
const request = require('supertest');

const mockSWAPIresponse = require('./__mocks__/mockUtils');

describe('Express server test', () => {
  describe('GET /characters', () => {
    beforeEach(() => {
      jest.clearAllMocks();

    });

    it('responds with expected number of characters in json format', function (done) {
      mockSWAPIresponse();

      request(app)
        .get('/characters')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.results.length === 20).toBe(true);
          done();
        });
    });

    it('responds 500 status in case of error', function (done) {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject());

      request(app)
        .get('/characters')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
  });
});
