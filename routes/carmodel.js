var express = require("express");
const {
  CarModel,
  CarMake
} = require("../config/database");
var router = express.Router();
const Op = require("sequelize").Op; 

//All Countries
router.get("/", function (request, response) {
  debugger
  var result = { returnCode: 0, data: null, returnMessage: "" };
  CarModel.findAll({order:[['Name', 'ASC']]}).then(res => {
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

//All CarModel By pagind
router.get('/paging/all', function (request, response) {

  debugger 
  var pageSize = request.query.page_size;
  var page = request.query.page;
  var result = { returnCode: 0, count: 0, data: null, returnMessage: "" };
  
  CarModel.findAndCountAll({
    where: { IsActive: true }, include:
      [{ model: CarMake }],
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




// Get Carmodel  By Id
router.get('/:id', function (request, response) {
  debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarModel.findByPk(request.params.id).then(data=>{
        if (data!=null)
        {
            result.returnMessage="success";
            result.returnCode=1;
            result.data=data;
            response.json(result);
        }
        else
        {
            result.returnMessage="user not find";
            response.json(result);
        }

    }).catch(err=>{
        result.returnMessage="server error";
        result.returnCode=-1;
        response.json(result);

    })
  
});


// Add Car Model
router.post("/create", function (request, response) {
    debugger

  var result = { returnCode: 0, data: null, returnMessage: "" };
  CarModel.create(request.body).then(res => {

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
  CarModel.findByPk(request.params.id).then(res => {
    if (res != null) {
        res.Name=request.body.Name;
        res.CarMakeId=request.body.CarMakeId;
        res.Capacity=request.body.Capacity;
        res.Doors=request.body.Doors;
        res.TransmissionType=request.body.TransmissionType;
        res.BigPieceLuggage=request.body.BigPieceLuggage;
        res.SmallPieceLuggage=request.body.SmallPieceLuggage;
        res.IsActive=true;
        res.CreatedOn=request.body.CreatedOn;
        res.UpdatedOn=request.body.UpdatedOn;
      res.save();
      result.data = res;
      result.returnMessage = "Success"
    }
    else {
      result.returnCode = -1;
      result.returnMessage = "CarModel not found"
    }
    response.json(result);
  }).catch(err => {
    response.send(err);
  });
});

router.post("/delete/:id", function (request, response) {
    debugger
  var result = { returnCode: 0, data: null, returnMessage: "" };
  CarModel.destroy({ where: { Id: request.params.id } }).then(res => {
    result.data = true;
    result.returnMessage = "Success";
    response.json(result);
  }).catch(err => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  })
});


router.post("/carmodelexist", function (request, response) {
  debugger
  var result = { returnCode: 0, data: null, returnMessage: "" };
  CarModel.findOne({ where: { Name: request.body.Name, Id: { [Op.ne]: request.body.Id } } }).then(res => {
    if (res == null) {
      result.returnCode = 0;
      result.returnMessage = "CarModel not exists";
    }
    else {
      result.returnCode = -1;
      result.returnMessage = "CarModel already exist";
    }
    response.json(result);
  }).catch(err => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  });
});

module.exports = router;
