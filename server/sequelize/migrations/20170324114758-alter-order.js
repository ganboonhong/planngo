'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
        'Orders',
        'price',
        {
            type:Sequelize.DECIMAL(10, 2)
        }    
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
        'Orders',
        'price',
        {
            type:Sequelize.FLOAT
        }    
    )
  }
};
