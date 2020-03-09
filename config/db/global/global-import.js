const Sequelize = require('sequelize');


let CUSTOM_NoDE_ENV ='dev'

//Gloabls 

const globalOptions = {
    timestamps: false,
    paranoid: true,
    freezeTableName: true
  };

  //Conection With Local Data Base
  let sqlConnectionobj = new Sequelize('CarRental','root','password',{
      host:'localhost',
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });


  //Connection of live Db
//   if (CUSTOM_NODE_ENV === 'prod') {
//     sqlConnObject = new Sequelize('livedbname', 'rootname', 'password', {
//       host: 'postnumber',
//       dialect: 'mysql',
//       operatorsAliases: false,
//       pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       }
//     });
//   }




  //conection
  const sequelize = sqlConnectionobj;

  const global = {
    "Sequelize": Sequelize,
    "sequelize": sequelize,
    "SequelizeGlobalOptions": globalOptions
  };
  
  module.exports = global;