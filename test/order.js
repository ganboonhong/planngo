'use strict';

const 
assert     = require('chai').assert,
supertest  = require('supertest'),
expect     = require('chai').expect,
Global     = require('../src/components/Global'),
production = Global.production,
url        = (production) ? 'http://demowebsite.ddns.net:9000' : 'http://localhost:9000',
server     = supertest.agent(url);

let id;

describe('orders', () => {
  it('should return JSON object with values', function (done) {
    server
    .get('/orders')
    .query({isUnitTest: true})
    .end( (err, res) => {

        const 
        jsonObj  = res.body.list[0],
        sequence = jsonObj.sequence,
        price    = jsonObj.price;

        expect(price).to.be.a('number');
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
            id = res.body._id;
            done();
        } )

    })
})

describe('UPDATE new order', () => {
    it('should return updated order', (done) => {

        const order = { sequence: 'updated value', price: '12', remarks: '', id: id };

        server
        .post('/order')
        .send(order)
        .end( (err, res) => {
            expect(order.sequence).equal(res.body.sequence);
            done();
        } )

    })
})

describe('DELETE an order', () => {
    it('should delete an order', (done) => {

        const order = { id: id };

        server
        .delete('/order')
        .send(order)
        .end( (err, res) => {
            expect(1).equal(res.body.ok);
            done();
        })
    })
})