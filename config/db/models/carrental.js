const globalObj = require("../global/global-import");
const sequelize = globalObj.sequelize;
const Sequelize = globalObj.Sequelize;
const globalOptions = globalObj.SequelizeGlobalOptions;

const CarRental = sequelize.define("CarRental", {
    Id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    CarRegistrationId: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    BookingFrom: {
        type: Sequelize.STRING,
        allowNull: true
    },
    BookingTo: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    PickUpLocationId: {
        type: Sequelize.BIGINT,
        allowNull: false
    }, 
    BookingAmount:
    {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    AmountPaid:
    {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    BookedById:
    {
        type: Sequelize.BIGINT,
        allowNull: true
    },

    PaymentStatusId:
    {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    BookedStatusId:
    {
        type: Sequelize.BIGINT,
        allowNull: true

    },
    IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    CreatedOn: {
        type: Sequelize.DATE,
        allowNull: true
    },
    UpdatedOn: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, globalOptions);

module.exports = CarRental;
