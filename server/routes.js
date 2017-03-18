const models  = require('./sequelize/models');
const bodyParser = require('body-parser');
const crypto = require('crypto');
var Result = {success: false, msg: '', msgBsStyle: ''};
var Body;
var Res;


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
    // eo middlewares

    app.post('/join', function(req, res){
        
        var User = models.User;
        Body     = req.body;
        Res      = res;

        User.findOne({where: {email: Body.email}}
                        ).then(
                        (user) => {
                            if(!user){
                                Body.password = crypto.createHmac('sha256', Body.password).digest('hex');
                                var promise = User.create(Body
                                    ).then(
                                        (user) => {
                                            var tmpUser = user.get({plain: true});

                                            Result.success = true;
                                            Result.msg = 'Congratulations, '+tmpUser.name+' ! You\'ve signed up successfully.'
                                            Result.msgBsStyle = 'success';
                                        }
                                    );
                            }else{
                                Result.msg = 'This email has been used.'
                                Result.msgBsStyle = 'danger';
                            }
                            Res.send(Result);
                        });
                    });

    app.post('/login', (req, res) => {

        var User = models.User;
        Body     = req.body;
        Res      = res;

        User.findOne({where: {
                        email: Body.email,
                        password: crypto.createHmac('sha256', Body.password).digest('hex'),
                    }
                }
            ).then(
                (user) => {
                    if(user){
                        Result.msg = 'Login successfully! Welcome back ' + user.get({plain: true}).name + '.';
                        Result.msgBsStyle = 'success';
                    }else{
                        Result.msg = 'Wrong email or password.'
                        Result.msgBsStyle = 'danger';
                    }
                    Res.send(Result);
                }
            );
    })

}