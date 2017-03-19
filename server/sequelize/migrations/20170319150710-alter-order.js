'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Orders',
        'deletedAt',
        { 
            type: Sequelize.DATE,
            after: "updatedAt"
        }
    );
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('Orders', 'deletedAt');
  }
};
