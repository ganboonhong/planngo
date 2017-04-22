"use strict";
const models = require('./sequelize/models'),
bodyParser   = require('body-parser'),
crypto       = require('crypto'),
cookieParser = require('cookie-parser'),
session      = require('express-session'),
moment       = require('moment-timezone'),
Global       = require('../src/components/Global'),
cookieLife   = 60*1000,
production   = Global.production,
tz           = Global.tz,
password     = (production) ? 'Boonhong2015!' : '',
env          = (production) ? 'production' : 'development',
config       = require( __dirname + '/sequelize/config/config.json')[env];

let Result = {success: false, msg: '', msgBsStyle: ''},
Body       = {};

module.exports = function(app){

    // middlewares
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");  // enable cross origin request
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(cookieParser());
    app.use(bodyParser.json());       // to support JSON-encoded bodies

    app.use(session({
        secret: 'eodigital', 
        cookie:{maxAge:cookieLife},
        resave: false,
        saveUninitialized: true,
    }));

    app.use(function(req, res, next) {
        //to allow cross domain requests to send cookie information.
        res.header('Access-Control-Allow-Credentials', true);

        // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
        res.header('Access-Control-Allow-Origin',  req.headers.origin);

        // list of methods that are supported by the server
        res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');

        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

        next();
    });
    // eo middlewares

    app.post('/join', function(req, res){
        
        const User = models.User;
        Body     = req.body;

        User.findOne({where: {email: Body.email}}
                        ).then(
                        (user) => {
                            if(!user){
                                Body.password = crypto.createHmac('sha256', Body.password).digest('hex');
                                User.create(Body
                                    ).then(
                                        (user) => {
                                            const tmpUser       = user.get({plain: true});

                                            res.cookie('email' , tmpUser.email, {expire : new Date() + cookieLife});

                                            Result.success    = true;
                                            Result.msg        = 'Congratulations, '+tmpUser.name+' ! You\'ve signed up successfully.'
                                            Result.msgBsStyle = 'success';
                                            res.send(Result);
                                        }
                                    );
                            }else{
                                Result.msg        = 'This email has been used.'
                                Result.msgBsStyle = 'danger';
                                Result.success    = false;
                                res.send(Result);
                            }
                        });
    }); // eo post join

    app.post('/login', (req, res) => {

        const User = models.User;
        Body     = req.body;

        if(req.cookies.email){
            Result.msg = 'you\'ve already signed in.';
            Result.msgBsStyle = 'danger';
            res.send(Result);
        }else{

            User.findOne({where: {
                        email: Body.email,
                        password: crypto.createHmac('sha256', Body.password).digest('hex'),
                    }
                }
            ).then(
                (user) => {
                    if(user){
                        const tmpUser         = user.get({plain: true});
                        Result.msg          = 'Login successfully! Welcome back ' + tmpUser.name + '.';
                        Result.msgBsStyle   = 'success';
                        Result.success      = true;

                        res.cookie('email' , tmpUser.email, {expire : new Date() + cookieLife});
                        res.send(Result);
                    }else{
                        Result.msg        = 'Wrong email or password.'
                        Result.msgBsStyle = 'danger';
                        Result.success    = false;
                        res.send(Result);
                    }
                }
            );
        }
    }) // eo post login

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

    app.get('/logout', (req, res) => {
        res.cookie('email', '', {expires: new Date(0)});
        res.redirect('./login');
    })

    app.get('/orders', (req, res) => {

        if(!req.cookies.email && production) {
            // in development env, cookie can't be set between different port, hence there's no need to check authority
            res.send({message: 'error'}); return;
        }

        const Order   = models.Order,
        Sequelize     = require('sequelize'),
        sequelize     = new Sequelize(config.database, config.username, config.password, config);
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

    app.delete('/order', (req, res) => {
        const Order = models.Order;
        Body      = req.body;

        Order.destroy({
            where: {
                id: Body.id
            },
            paranoid: true
        }).then( () => {
            res.send(Body);
        });
    })  // eo delete order

    app.get('/receipt/:id', (req, res) => {


        const 
        fs         = require('fs'),
        pdf        = require('html-pdf'),
        jade       = require('jade'),
        Order      = models.Order,
        orderId    = req.params.id;

        Order.findOne({
            where: {id: orderId}
        }).then((orderRaw) => {
            

            const 
            htmlPath   = __dirname + '/../views/htmls/receipt.html',
            pdfPath    = __dirname + '/../views/pdfs/receipt.pdf',
            html       = fs.readFileSync( htmlPath, 'utf8'),
            order      = orderRaw.get({plain: true}),
            options    = {format: 'A4'},
            htmlString = jade.renderFile(__dirname + '/../views/receipt.jade', {
                title: order.sequence,
                content: order.sequence,
            });

            console.log(htmlString)

            fs.truncate(htmlPath, 0, () => {
                fs.writeFileSync( htmlPath, htmlString);

                pdf.create(html, options).toFile(pdfPath, (err, res) => {
                    if (err) console.log(err)
                })

                const fileName = 'EO Digital Receipt.pdf';

                res.download(pdfPath, fileName, (err) => {
                    // error handler
                });
            })

        })

        // res.render('receipt', {
        //     title: 'Yoyo'
        // })
    })

}