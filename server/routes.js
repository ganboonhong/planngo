const models  = require('./sequelize/models');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
var Sess;
var Result = {success: false, msg: '', msgBsStyle: ''};
var Body;

module.exports = function(app){

    // middlewares
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");  // enable cross origin request
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));

    app.use(session({
        secret: 'eodigital', 
        cookie:{maxAge:60*1000},
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
                                res.send(Result);
                            }
                        });
    }); // eo post join

    app.post('/login', (req, res) => {

        var User = models.User;
        Body     = req.body;
        Sess     = req.session;

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
                        Sess[tmpUser.email] = true;
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
        var Order = models.Order;

        Order.findAll({
            where: {},
            order: [['id', 'DESC']],
            raw: true
        }).then((orders) => {
            res.send(orders);
        });
    });  // eo get order

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