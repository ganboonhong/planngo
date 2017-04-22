const 
assert    = require('chai').assert,
supertest = require('supertest'),
expect    = require('chai').expect
server    = supertest.agent('http://localhost:9000');

describe('orders', () => {
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

describe('CREATE new order', () => {
    it('should return created order', (done) => {
        const order = { sequence: 'new value', price: '12', remarks: '', id: '' };

        server
        .post('/order')
        .send(order)
        .end( (err, res) => {
            expect(order.sequence).equal(res.body.sequence);
            done();
        } )

    })
})

describe('UPDATE new order', () => {
    it('should return updated order', (done) => {
        const order = { sequence: 'updated value', price: '12', remarks: '', id: '134' };

        server
        .post('/order')
        .send(order)
        .end( (err, res) => {
            expect(order.sequence).equal(res.body.sequence);
            done();
        } )

    })
})