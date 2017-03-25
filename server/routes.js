const models  = require('./sequelize/models'),
bodyParser = require('body-parser'),
crypto = require('crypto'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
moment = require('moment');

// const production = true;
const production = false;

var Sess,
Result = {success: false, msg: '', msgBsStyle: ''},
Body,
cookieLife = 60*1000,
password = (production) ? 'Boonhong2015!' : '',
env = (production) ? 'production' : 'development',
config = require( __dirname + '/sequelize/config/config.json')[env];

module.exports = function(app){

    // middlewares
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");  // enable cross origin request
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(cookieParser());
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));

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
        
        var User = models.User;
        Body     = req.body;

        User.findOne({where: {email: Body.email}}
                        ).then(
                        (user) => {
                            if(!user){
                                Body.password = crypto.createHmac('sha256', Body.password).digest('hex');
                                var promise   = User.create(Body
                                    ).then(
                                        (user) => {
                                            var tmpUser       = user.get({plain: true});
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

        var User = models.User;
        Body     = req.body;
        Sess     = req.session;


        console.log(Sess);

        if(Sess[Body.email]){
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
                        var tmpUser         = user.get({plain: true});
                        Result.msg          = 'Login successfully! Welcome back ' + tmpUser.name + '.';
                        Result.msgBsStyle   = 'success';
                        Result.success      = true;

                        res.cookie('email' , tmpUser.email, {expire : new Date() + cookieLife});

                        Sess['email'] = true;
                        res.send(Result);
                    }else{
                        Result.msg        = 'Wrong email or password.'
                        Result.msgBsStyle = 'danger';
                        res.send(Result);
                    }
                }
            );
        }
    }) // eo post login

    app.post('/order', (req, res) => {
        var Order = models.Order;
        Body      = req.body;
        // Sess      = req.session;
        // TODO: check session

        if(!Body.id){
            // create
            Order.create(Body).then(
                (order) => {
                    res.send(Body);
                }
            )
        }else{
            var id = Body.id;
            delete Body.id;

            // edit
            Order.update(Body,{
                where: {id: id}
            })
            res.send(Body);
        }
    })  // eo post order

    app.get('/orders', (req, res) => {
        console.log(req.cookies.email);

        if(!req.cookies.email) res.send({message: 'error'});

        var Order     = models.Order;
        // Sess       = req.session;
        var startDate = moment().add(-30, 'days').format('YYYY-MM-DD HH:mm');
        var endDate   = moment().format('YYYY-MM-DD HH:mm');
        var currentFilter = 'sequence';
        var keyword = '';
        var likeQuery = '"%"+ keyword +"%"';
        var Sequelize = require('sequelize');
        var sequelize = new Sequelize(config.database, config.username, config.password, config);

        if(req.query.startDate) startDate = req.query.startDate;
        if(req.query.endDate) endDate = req.query.endDate;
        if(req.query.keyword) keyword = req.query.keyword;
        if(req.query.currentFilter) currentFilter = req.query.currentFilter;
        if(req.query.currentFilter == 'price') keyword = parseFloat(keyword);

        sequelize.query(
            "SELECT * FROM Orders WHERE "+
            currentFilter + " LIKE '%" + keyword + 
            "%' AND updatedAt >= '" + startDate
            + "' AND updatedAt <= '" + endDate + "' ORDER BY id DESC",

            { type: sequelize.QueryTypes.SELECT})

            .then((orders) => {
                res.send(orders);
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
        var Order = models.Order;
        Body      = req.body;

        Order.destroy({
            where: {
                id: Body.id
            },
            paranoid: true
        }).then( () => {
            // delete callback
        });

        res.send(Body);
    })  // eo delete order

}