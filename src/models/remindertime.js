'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReminderTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReminderTime.init({
    departureTime: {
     type: DataTypes.DATE,
     allowNull:false
    },
    arrivalTime: {
      type:DataTypes.DATE,
      allowNull:false
    },
    Reminder: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    Email:{
      type: DataTypes.STRING,
      allowNull:false

    },
    STATUS:{
      type: DataTypes.STRING,
      defaultValue:"Pending"

    } 
  }, {
    sequelize,
    modelName: 'ReminderTime',
  });
  return ReminderTime;
};