const
ServerGlobal    = require('../global.js'),
Global          = require('../../src/components/Global'),
models          = ServerGlobal.models,
production      = Global.production,
cookieLife      = Global.cookieLife,
env             = Global.env,
moment          = Global.moment,
tz              = Global.tz,
sequelizeConfig = ServerGlobal.sequelizeConfig;

let Result = {success: false, msg: '', msgBsStyle: ''},
Body       = {};

module.exports = (app) => {

    app.delete('/order', (req, res) => {
        const Order = models.Order;
        console.log(typeof req.body)
        Body      = req.body;

        Order.destroy({
            where: {
                id: Body.id
            },
            paranoid: true
        }).then( (promise) => {
            res.send(Body);
        });
    })  // eo delete order

    app.get('/orders', (req, res) => {

        if(!req.cookies.email && production) {
            // in development env, cookie can't be set between different port, hence there's no need to check authority
            res.send({message: 'error'}); return;
        }

        const Order   = models.Order,
        Sequelize     = require('sequelize'),
        sequelize     = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig);
        let startDate = moment().tz(tz).add(-30, 'days').format('YYYY-MM-DD HH:mm'),
        endDate       = moment().tz(tz).add(1, 'hours').format('YYYY-MM-DD HH:mm'),
        currentFilter = 'sequence',
        keyword       = '';

        if(req.query.startDate) startDate = req.query.startDate;
        if(req.query.endDate) endDate = req.query.endDate;
        if(req.query.keyword) keyword = req.query.keyword;
        if(req.query.currentFilter) currentFilter = req.query.currentFilter;
        if(req.query.currentFilter == 'price') keyword = parseFloat(keyword);

        sequelize.query(
            "SELECT * FROM Orders WHERE "+
            currentFilter + " LIKE '%" + keyword + 
            "%' AND updatedAt >= '" + startDate
            + "' AND updatedAt <= '" + endDate
            + "' AND deletedAt IS NULL " +
            "ORDER BY id DESC",

            { type: sequelize.QueryTypes.SELECT})

            .then((orders) => {
                res.send({list: orders, user: req.cookies.email});
            })

            // Order.findAll({
            //     where: {
            //         updatedAt:{
            //             $between: [startDate, endDate]
            //         },
            //         [currentFilter]: {
            //             $like: (typeof keyword == 'number') ? keyword : "%"+ keyword +"%"
            //         }
            //     },
            //     order: [['id', 'DESC']],
            //     raw: true
            // }).then((orders) => {
            //     res.send(orders);
            // });

    });  // eo get orders

    app.post('/order', (req, res) => {
        const 
        Order = models.Order,
        Body  = req.body;

        if(!Body.id){
            // create
            Order.create(Body)
            .then((order) => {
                res.send(Body);
            }).catch((err) => {
                console.log("Error when creating order: " + err)
            })
        }else{
            // update
            Order.update(Body,{
                where: {id: Body.id}
            }).then((order) => {
                res.send(Body);
            }).catch((err) => {
                console.log("Error when updating order: " + err)
            })
        }
    })  // eo post order
}