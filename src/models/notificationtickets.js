'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationTickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationTickets.init({
    subject: {
    type:  DataTypes.STRING,
    allowNull:false
    },
    content: {
     type: DataTypes.STRING,
     allowNull:false
    },
    receipentEmail: {
      type:DataTypes.STRING,
      allowNull:false
    },
    status: {

    type:  DataTypes.ENUM,
    values:["pending","success","failed"],
    allowNull:false,
    
    defaultValue:"pending"

    },
    notification: {
      type:DataTypes.DATE,
      allowNull:false
  }}, {
    sequelize,
    modelName: 'NotificationTickets',
  }
);
  return NotificationTickets;
};