const models  = require('./sequelize/models');
const bodyParser = require('body-parser');
const crypto = require('crypto');
var Result = {success: false, error: ''};
var Body;
var Res;


module.exports = function(app){

    // enable cross origin request
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: false
    }));

    app.post('/join', function(req, res){
        
        var User = models.User;
        Body     = req.body;
        Res      = res;

        User.findOne({where: {name: Body.name}}).then(function(user){
            if(!user){
                Body.password = crypto.createHmac('sha256', Body.password).digest('hex');
                var promise = User.create(Body);
                if(promise) Result.success = true;
            }else{
                Result.error = 'duplicated'
            }
            Res.send(Result);
        });
    });

}