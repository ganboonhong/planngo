const 
ViewGlobal      = require('../src/components/Global'),
models          = require('./sequelize/models'),
sequelizeConfig = require( __dirname + '/sequelize/config/config.json')[ViewGlobal.env];

module.exports = {
    models: models,
    sequelizeConfig: sequelizeConfig
}