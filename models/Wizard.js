const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Wizard extends Model {}

Wizard.init(
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
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: "wizard",
  }
);

module.exports = Wizard;
