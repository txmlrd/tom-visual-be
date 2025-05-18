const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Project = sequelize.define("Projects", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mainImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "ProjectTypes",
      key: "id",
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = Projects;
Project.associate = (models) => {
  Project.belongsTo(models.ProjectTypes, { foreignKey: 'projectTypeId' });
  Project.hasMany(models.LogoImages, { foreignKey: 'projectId' });
};
