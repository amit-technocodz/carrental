var express = require("express");
const {
  sequelize,
  City,
  Locality

} = require("../config/database");
var router = express.Router();
const Sequelize = require('sequelize');
const Op = require("sequelize").Op;


//all cities by paging
router.get('/paging/all', function (request, response) {
  debugger
  var pageSize = request.query.page_size;
  var page = request.query.page;
  var result = { returnCode: 0, count: 0, data: null, returnMessage: "" };
  Locality.findAndCountAll({
    where: { IsActive: true }, include:
      [{ model:City }],
    order: [['CreatedOn', 'DESC']]
  }).then(locality => {
    result.count = locality.rows.length;
    result.data = locality.rows.slice((page - 1) * pageSize, page * pageSize);
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

//all cities
router.get('/', function (request, response) {
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
 Locality.findAll({
    where: { IsActive: true },
    include: [{
      model: City
    }]
  }).then(locality => {
    result.data = locality;
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

//Get locality by name
router.get('/byname', (_req, _res) => {
  debugger
  var result = { returnCode: 0, data: null, returnMessage: "" };
  Locality.findAll({
    where: { Name: { [Op.like]: '' + _req.query.name + '%' } }
  }).then(data => {
    result.data =data;
    _res.json(result);
  }).catch(err => {
    _res.send(err);
  });
});

//get locality by cityId

router.get('/loclityid/:id', (_req, _res) => {
  debugger
  Locality.findAll({
    where: {
      cityId: _req.params.id 
    },
    include: [{
      model: City
    }],
    order:[  ['Name', 'ASC']]
  }).then(data => {
    _res.json(data);
  }).catch(err => {
    _res.send(err);
  });
});

router.get('/cities', (_req, _res) => {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  Locality.findAll({
    where: {
      cityId: _req.query.cities.split(",")
    },
    order:[  ['Name', 'ASC']]
  }).then(data => {
    result.data = data;
    _res.json(result);
  }).catch(err => {
   
  });
});

// Get locality By Id
router.get('/:id', function (request, response) {
  debugger
    var result = {
        returnCode: 0,
        data: null,
        returnMessage: ""
      };
  Locality.findByPk(request.params.id).then(loclity=>{
      if(loclity!=null)
      {
          result.returnCode=1;
          result.returnMessage="success";
          result.data=loclity; 
      }
      else{
          result.returnMessage("city not found");
      }
      response.json(result);

  }).catch(err=>{
      result.returnCode=-1;
      result.returnMessage="server error";
      response.json(result);
  })
});


// Add city
router.post("/create", function (request, response) {
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  Locality.create(request.body, {
    include: [{
      model: City
    }]
  }).then(locality => {
    result.data = locality;
    result.returnMessage = "Success";
    response.json(result);
  }).catch(err => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  })
});
//update city
router.post("/update/:id", function (request, response) {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  Locality.findByPk(request.params.id).then(data => {
    debugger
    if (data != null) {
      data.Name = request.body.Name;
      data.CityId = +request.body.cityId;
      data.save();
      result.data = data;
      result.returnMessage = "Success"
    } else {
      result.returnCode = -1;
      result.returnMessage = "city not found"
    }
    response.json(result);
  }).catch(err => {
    debugger
    response.send(err);
  });
});
//delete location
router.post("/delete/:id", function (request, response) {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  Locality.findByPk(request.params.id).then(data=> {
    if (data != null) {
      data.IsActive = false;
      data.save();
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

router.get('/getby/locality', (_req, _res) => {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  Locality.findAll({
    where: {
      Id: _req.query.localityId.split(",")
    }
  }).then(data => {
    result.data = data;
    _res.json(result);
  }).catch(err => {
      _res.send(err);
    //return basicOperations.MakeErrorResultObject(basicOperations.StatusCodes.CODE404, null, basicOperations.STRINGS.SERVER_ERROR);
  });
});

module.exports = router;
