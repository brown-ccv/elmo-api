/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app/server');

chai.use(chaiHttp);
chai.should();

describe('Jobs', () => {
  describe('GET /', () => {
    // Test to get all students record
    it('should get jobs data', (done) => {
      chai.request(app)
        .get('/summary/jobs/count?granularity=month')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0][0].should.be.a('object');
          res.body[0][0]['count'].should.be.a('number');
          done();
        });
    });
  });
});
