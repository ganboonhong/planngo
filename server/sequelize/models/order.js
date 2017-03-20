'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    sequence: DataTypes.STRING,
    price: DataTypes.FLOAT(11),
    remarks: DataTypes.TEXT
  }, {
    paranoid: true // enable soft delete
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Order;
};