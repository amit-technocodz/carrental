var express = require("express");
const {
 CarRental,
 CarModel,
 CarRentalPrice,
 CarRegistration,
 PaymentStatus,
 BookingStatus,
 Locality,
 User,
 UserProfile,
 CarType,
 DriverDetail

} = require("../config/database");
var router = express.Router();
const Op = require("sequelize").Op;

//All Countries
router.get("/", function (request, response) {
    debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarRental.findAll({include:[{ model: CarModel }]}).then(res => {
      result.data = res;
      result.returnMessage = "Success";
      response.json(result);
      return;
    }).catch(error => {
      result.returnCode = -1;
      result.returnMessage = "Server Error";
      response.json(result);
      return;
    });
  });

  //All  By paging
  router.get('/paging/all', function (request, response) {

    debugger
    var pageSize = request.query.page_size;
    var page = request.query.page;
    var result = { returnCode: 0, count: 0, data: null, returnMessage: "" };

    CarRental.findAndCountAll({
      where: { IsActive: true }, include:
      [{ model:BookingStatus},{model:PaymentStatus},{ model: CarRegistration,include:[{model:CarModel}] }],
      order: [['CreatedOn', 'DESC']]
    }).then(res => {
      result.count = res.rows.length;
      result.data = res.rows.slice((page - 1) * pageSize, page * pageSize);
      result.returnCode = 0;
      result.returnMessage = "Success";
      response.json(result);
    }).catch(error => {
      debugger
      result.returnCode = -1;
      result.returnMessage = "Server Error";
      response.json(result);
      return;
    });
  });

  //Get By Id
  router.get('/:id',function(request,response){
      var result = { returnCode: 0, data: null, returnMessage: "" };
      CarRental.findByPk(request.params.id,{include:[{model:DriverDetail}]}).then(res=>{
          if(res!=null)
          {
              result.data=res;
              result.returnCode=1;
              result.returnMessage="successfull"
              response.json(result);
          }
          else
          {
            result.returnMessage="User Not Found";
            response.json(result);
          }
      }).catch(err=>{
          response.send(err)
      })
  })

    //Get All Booked Dates Of A Specific Car Registeratopm
    router.get('/getDates/:id',function(request,response){
      var result = { returnCode: 0, data: null, returnMessage: "" };

      CarRental.findAll({
        where: { CarRegistrationId: request.params.id, IsActive: true }, include:
        [{ model:BookingStatus}]
      }).then(res => {
        result.data = res.map(({ BookingFrom, BookingTo }) => ({ BookingFrom, BookingTo }));
        result.returnCode = 0;
        result.returnMessage = "Success";
        response.json(result);
      }).catch(error => {
        debugger
        result.returnCode = -1;
        result.returnMessage = "Server Error";
        response.json(result);
        return;
      });
  })

//Get All Available Cars By Vendor
router.get('/getAvailableCars/:id/:date', function(request, response){
  var result = { returnCode: 0, data: null, returnMessage: "" };
  CarRental.findAll({
    // where: { [Op.or]: { BookingFrom: { [Op.gt]: request.params.date }, BookingTo: { [Op.lt]: request.params.date } }}, 
    include: [ { model:CarRegistration,include:[{model:CarModel}, {model:CarType}] } ]
   }).then(res =>{
     result.data = res.filter(x => x.CarRegistration.VenderId == request.params.id );
     result.returnCode = 0;
     result.returnMessage = "Success";
     response.json(result);
   })
  CarRental.findAll({
   where: { [Op.or]: { BookingFrom: { [Op.gt]: request.params.date }, BookingTo: { [Op.lt]: request.params.date } }}, 
   include: [ { model:CarRegistration,include:[{model:CarModel}, {model:CarType}] } ]
  }).then(res =>{
    let tempRes = res.filter(x => x.CarRegistration.VenderId == request.params.id );
    result.data = res.filter(x => x.CarRegistration.VenderId == request.params.id );
    result.returnCode = 0;
    result.returnMessage = "Success";
    response.json(result);
  }).catch(error => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
    return;
  })
})

  router.post("/create", function (request, response) {
      debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarRental.create(request.body,{include:[{model:DriverDetail}]}).then(res => {

      result.data = res;
      result.returnMessage = "Success";
      response.json(result);
    }).catch(err => {
      result.returnCode = -1;
      result.returnMessage = "Server Error";
      response.json(result);
    })
  });

  router.post("/update/:id", function (request, response) {
      debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarRental.findByPk(request.params.id).then(res => {
      debugger
      if (res != null) {
          res.CarRegistrationId=request.body.CarRegistrationId;
          res.BookingFrom=request.body.BookingFrom;
          res.BookingTo=request.body.BookingTo;
          res. PickUpLocationId=request.body.PickUpLocationId;
          res.BookingAmount=request.body.BookingAmount;
          res.AmountPaid=request.body.AmountPaid;
          res. BookedTo=request.body.BookedTo;
          res.BookedById=request.body.BookedById;
          res.PaymentStatusId=request.body.PaymentStatusId;
          res.BookedStatusId=request.body.BookedStatusId;
          res.IsActive=true;
          res.CreatedOn=request.body.CreatedOn;
          res.UpdatedOn=request.body.UpdatedOn;
          res.save();
        updateDriver(request.body.DriverDetail);
        result.data = res;
        result.returnMessage = "Success"
      }
      else {
        result.returnCode = -1;
        result.returnMessage = "CarRegistration  not found"
      }
      response.json(result);
    }).catch(err => {
      response.send(err);
    });
  });

  function updateDriver(model)
  {
    debugger
    DriverDetail.findByPk(model.Id).then(res=>{
      res.FirstName=model.FirstName;
      res.LastName=model.LastName;
      res.Email=model.Email;
      res.PhoneNumber=model.PhoneNumber;
      res.IsDriverAgeDesired=model.IsDriverAgeDesired;
      res.FlightNumber=model.FlightNumber;
      res.UpdatedOn=model.UpdatedOn;
      res.save();
    })


  }

  router.post("/delete/:id", function (request, response) {
      var result = {
        returnCode: 0,
        data: null,
        returnMessage: ""
      };
      CarRental.findByPk(request.params.id).then(res => {
        if (res != null) {
          res.IsActive = false;
          res.save();
          result.data = true;
          result.returnMessage = "Success";
          response.json(result);
        }
      }).catch(err => {
        result.returnCode = -1;
        result.returnMessage = "Server Error";
        response.json(result);
      })
    });



    module.exports = router;

module.exports = router;
