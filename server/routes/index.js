"use strict";
const
bodyParser   = require('body-parser'),
cookieParser = require('cookie-parser'),
session      = require('express-session'),
Global       = require('../../src/components/Global'),
production   = Global.production,
cookieLife   = Global.cookieLife;

module.exports = function(app){

    // middlewares
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");  // enable cross origin request
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(cookieParser());
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({
      extended: true
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

    require('./order.js')(app);
    require('./member.js')(app);
    require('./pdf.js')(app);

}