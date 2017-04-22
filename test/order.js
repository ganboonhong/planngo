const 
assert = require('chai').assert;
supertest = require('supertest');
expect = require('chai').expect;

var server = supertest.agent('http://localhost:9000');

describe('orders api', function () {
  it('should return JSON object with values', function (done) {
    server
    .get('/orders')
    .end( (err, res) => {
        const 
        jsonObj  = JSON.parse(res.text),
        sequence = jsonObj.list[0].sequence,
        id       = jsonObj.list[0].id;

        expect(id).to.be.a('number');
        expect(sequence).to.be.a('string');

        done();
    })
  });
});