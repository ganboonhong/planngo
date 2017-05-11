const 
ViewGlobal         = require('../src/components/Global'),
// models          = require('./sequelize/models'),
// sequelizeConfig = require( __dirname + '/sequelize/config/config.json')[ViewGlobal.env],
moment             = ViewGlobal.moment,
production         = ViewGlobal.production,
utcHr              = 8*60*60*1000;

module.exports = {
    // models: models,
    // sequelizeConfig: sequelizeConfig,
    moment: moment,
    utcHr: utcHr,
    production: production,
}