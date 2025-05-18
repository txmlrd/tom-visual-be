const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const ProjectType = sequelize.define(
  "ProjectTypes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
ProjectType.associate = (models) => {
  ProjectType.hasMany(models.Projects, { foreignKey: "projectTypeId" });
};
module.exports = ProjectType;
