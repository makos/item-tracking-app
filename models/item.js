'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    Name: DataTypes.STRING,
    Amount: DataTypes.INTEGER,
    Price: DataTypes.FLOAT
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};