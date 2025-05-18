const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const LogoImage = sequelize.define("LogoImages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Projects",
      key: "id",
    },
  },
  logoPath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = LogoImages;
LogoImage.associate = (models) => {
  LogoImage.belongsTo(models.Projects, { foreignKey: 'projectId' });
};
