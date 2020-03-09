const globalObj = require("../global/global-import");
const sequelize = globalObj.sequelize;
const Sequelize = globalObj.Sequelize;
const globalOptions = globalObj.SequelizeGlobalOptions;

const Agency = sequelize.define("Agency", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  RoleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  IsBlocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  IsEmailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  IsApproved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
},globalOptions);

module.exports = Agency;
