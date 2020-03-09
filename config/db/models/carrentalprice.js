const globalObj = require("../global/global-import");
const sequelize = globalObj.sequelize;
const Sequelize = globalObj.Sequelize;
const globalOptions = globalObj.SequelizeGlobalOptions;

const CarRentalPrice = sequelize.define("CarRentalPrice",{
  Id:{
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  CarRegistrationId:{
  type:Sequelize.BIGINT,
  allowNull:false
  },
  BeforeDiscountPrice:{
    type: Sequelize.STRING,
    allowNull:true
  },
  Price:{
    type: Sequelize.STRING,
    allowNull:true
  },
  IsActive:{
    type: Sequelize.BOOLEAN,
    allowNull:true
  },
  CreatedOn: {
    type: Sequelize.DATE,
    allowNull: true
  },
  UpdatedOn: {
    type: Sequelize.DATE,
    allowNull: true
  }
},globalOptions);

module.exports = CarRentalPrice;
