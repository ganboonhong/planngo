"use strict";
const
Global       = require('../../src/components/Global'),
Order        = require('../mongo/models/order'),
production   = Global.production,
moment       = Global.moment;

let Body = {};

module.exports = (app) => {

    app.delete('/order', (req, res) => {

        const Body = req.body;

        Order.delete({_id: Body.id}, (err, result) => {
            if(err) throw err;
            res.send(Body);
        })
        
    })  // eo delete order

    app.get('/orders', (req, res) => {

        if(!req.cookies.email && production) {
            // in development env, cookie can't be set between different port, hence there's no need to check authority
            res.send({message: 'error'}); return;
        }

        let 
        startDate     = moment().add(-30, 'days').format('YYYY-MM-DD'),
        endDate       = moment().add(1, 'days').format('YYYY-MM-DD'),
        currentFilter = 'sequence',
        keyword       = '';

        if(req.query.startDate) startDate         = req.query.startDate;
        if(req.query.endDate) endDate             = req.query.endDate;
        if(req.query.keyword) keyword             = req.query.keyword;
        if(req.query.currentFilter) currentFilter = req.query.currentFilter;

        if(req.query.currentFilter == 'price') { // search the whole word if it's Number

            let toSearch = {};
            toSearch[currentFilter] = keyword;
            toSearch['deleted'] = false;

            Order.find(toSearch, (err, orders)=>{
                if(err) throw err;
                res.send({list: orders, user: req.cookies.email});
            } )

        }else{
            let obj = {};
            let toSearch = keyword.split(" ").map(function(n) {
                obj[currentFilter] = new RegExp(n.trim(), 'i');
                obj['createdAt'] = {"$gte": startDate, "$lt": endDate};
                obj['deleted'] = false;
                return obj;
            });

            Order.find({$and: toSearch},null, { sort: '-updatedAt'},  (err, orders)=>{
                if(err) throw err;
                res.send({list: orders, user: req.cookies.email});
            } )
        }

    });  // eo get orders

    app.post('/order', (req, res) => {
        const Body = req.body;

        if(!Body.id){
            const order = new Order(Body);
            order.save((err, order) => {
                if(err) throw err;
                res.send(Body);
            });
        }else{
            Order.findOneAndUpdate({_id: Body.id}, {$set: Body}, (err, order) => {
                if(err) throw err;
                res.send(Body);
            });
        }
    })  // eo post order
}