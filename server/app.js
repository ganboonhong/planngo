// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')


const Sequelize = require('sequelize');
const sequelize = new Sequelize('eodigital', 'root','', {
                        host: 'localhost', 
                        dialect: 'mysql'
                    });

var Users = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        }
    },{
        freezeTableName: true
    }
);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.post('/join', function(req, res){
    console.log(req.body);

    Users.sync({force: false}).then(
    function(){
        return Users.create(req.body)
    }
);


    res.send(req.body);
} );





// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    console.log(456)
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;