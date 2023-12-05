const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Search extends Model {}

Search.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userinfo',
        key: 'id',
      },
    },
    animal_id: {
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'search',
  }
);

module.exports = Search;
