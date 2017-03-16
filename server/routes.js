var models  = require('./sequelize/models');
var bodyParser = require('body-parser');

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
        console.log(models.User.create(req.body));
        res.send(req.body);
    });

}