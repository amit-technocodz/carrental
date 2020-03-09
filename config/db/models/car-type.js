const globalObj = require("../global/global-import");
const sequelize=globalObj.sequelize;
const Sequelize= globalObj.Sequelize;
const globalOptions=globalObj.SequelizeGlobalOptions;

const CarType= sequelize.define("CarType",{
    Id:{
        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement: true
    },
    Name:{
        type:Sequelize.STRING,
        allowNull: true
    },
    Image:{
        type:Sequelize.TEXT,
        allowNull: true
    },
    LargeImage:{
        type:Sequelize.TEXT,
        allowNull: true
    },
    SmallImage:{
        type:Sequelize.TEXT,
        allowNull: true
    },

    IsActive:{
        type:Sequelize.BOOLEAN,
        allowNull: true
    }
},globalOptions);

module.exports=CarType;
