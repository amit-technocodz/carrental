const globalObj = require("./db/global/global-import");
const sequelize = globalObj.sequelize;
const Sequelize = globalObj.Sequelize;

//Tables 

const CarType = require("./db/models/car-type");
const Role = require("./db/models/role");
const User = require("./db/models/user");
const UserProfile = require("./db/models/user-profile");
const AgencyProfile = require("./db/models/agency-profile");
const Agency = require("./db/models/agency");
const Country = require("./db/models/country");
const City = require("./db/models/city");
const Locality = require("./db/models/locality");
const CarMake = require("./db/models/carmake");
const CarModel = require("./db/models/carmodel");
const CarRegistration = require("./db/models/carregistration");
const CarRentalPrice = require("./db/models/carrentalprice");
const CarRental = require("./db/models/carrental");
const PaymentStatus = require("./db/models/paymentstatus")
const BookingStatus = require("./db/models/bookingstatus")
const DriverDetail=require("./db/models/driverdetail")



//Association

//User Association
User.hasOne(UserProfile, {
  foreignKey: 'UserId',
  targetKey: 'Id'
});

Role.hasMany(User, {
  foreignKey: 'RoleId',
  targetKey: 'Id'
});

UserProfile.belongsTo(User, {
  foreignKey: 'UserId',
  targetKey: 'Id'
});

User.hasOne(AgencyProfile, {
  foreignKey: 'UserId',
  targetKey: 'Id'
});

AgencyProfile.belongsTo(User, {
  foreignKey: 'UserId',
  targetKey: 'Id'
})
//Association in city country and locality
Country.hasMany(City,
  {
    foreignKey: 'CountryId',
    targetKey: 'Id'
  })

City.belongsTo(Country, {
  foreignKey: 'CountryId',
  targetKey: 'Id'
})

City.hasMany(Locality, {
  foreignKey: 'CityId',
  targetKey: 'Id'
})
Locality.belongsTo(City, {
  foreignKey: 'CityId',
  targetKey: 'Id'
})

//Carmake And CarModel

CarMake.hasMany(CarModel, {
  foreignKey: 'CarMakeId',
  targetKey: 'Id'
})
CarModel.belongsTo(CarMake, {
  foreignKey: 'CarMakeId',
  targetKey: 'Id'
})

//CarRegistration 
CarType.hasMany(CarRegistration, {
  foreignKey: 'CarTypeId',
  targetKey: 'Id'
})
CarRegistration.belongsTo(CarType, {
  foreignKey: 'CarTypeId',
  targetKey: 'Id'
})

CarModel.hasMany(CarRegistration, {
  foreignKey: 'CarModelId',
  targetKey: 'Id'
})

CarRegistration.belongsTo(CarModel, {
  foreignKey: 'CarModelId',
  targetKey: 'Id'
})

User.hasMany(CarRegistration, {
  foreignKey: 'VenderId',
  targetKey: 'Id'
})

CarRegistration.belongsTo(User, {
  foreignKey: 'VenderId',
  targetKey: 'Id'
})


//Car Rental Price 

CarRegistration.hasOne(CarRentalPrice, {
  foreignKey: 'CarRegistrationId',
  targetKey: 'Id'
})

CarRentalPrice.belongsTo(CarRegistration, {
  foreignKey: 'CarRegistrationId',
  targetKey: 'Id'
})


//Car-Rental

// CarRental.hasOne(Locality, {
//   foreignKey: 'PickUpLocationId',
//   targetKey: 'Id'
// })
// Locality.belongsTo(CarRental, {
//   foreignKey:'PickUpLocationId',
//   targetKey:'Id'
// })


CarRental.belongsTo(CarRegistration,
  {
    foreignKey: 'CarRegistrationId',
    targetKey: 'Id'
  })

CarRegistration.hasOne(CarRental, {
  foreignKey: 'CarRegistrationId',
  targetKey: 'Id'
})


CarRental.belongsTo(PaymentStatus, {
  foreignKey: 'PaymentStatusId',
  targetKey: 'Id'
})

PaymentStatus.hasOne(CarRental, {
  foreignKey: 'PaymentStatusId',
  targetKey: 'Id'
})

CarRental.belongsTo(BookingStatus, {
  foreignKey: 'BookedStatusId',
  targetKey: 'Id'
})

BookingStatus.hasOne(CarRental, {
  foreignKey: 'BookedStatusId',
  targetKey: 'Id'
})


//DriverDetail 

CarRental.hasOne(DriverDetail,{
  foreignKey:'CarRentalId',
  targetKey:'Id'
})

DriverDetail.belongsTo(CarRental,{
  foreignKey:'CarRentalId',
  targetKey:'Id'
})




//Table crated or  delete

sequelize.sync({
  force: false
  //force:true 
  //  Enable this When you want to create database at the beganing
}).then(() => {
  console.log(`Database & tables created!`)
}).catch(err => {
  console.log(err);
});

module.exports = {
  sequelize,
  Sequelize,
  CarType,
  Role,
  User,
  UserProfile,
  AgencyProfile,
  Agency,
  Country,
  City,
  Locality,
  CarMake,
  CarModel,
  CarRegistration,
  CarRentalPrice,
  CarRental,
  PaymentStatus,
  BookingStatus,
  DriverDetail

}