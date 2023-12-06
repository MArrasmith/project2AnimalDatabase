const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Animal extends Model {}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    habitat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifespan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'animal',
  }
);

module.exports = Animal;