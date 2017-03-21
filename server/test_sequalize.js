var Sequelize = require('sequelize');
var sequelize = new Sequelize('eodigital', 'root','', {
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

Users.sync({force: false}).then(
    function(){
        return Users.create({
            name: 'John3',
            email: 'john3@gmail.com',
            password: '1235678'
        })
    }
);