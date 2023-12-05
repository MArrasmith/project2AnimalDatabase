const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class FunFact extends Model {}

FunFact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fact: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fun_fact',
  }
);

module.exports = FunFact;