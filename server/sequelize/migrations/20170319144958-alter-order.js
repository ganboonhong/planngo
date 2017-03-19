'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Orders',
      'remarks',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        after: "price"
      }
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'remarks')
  }
};