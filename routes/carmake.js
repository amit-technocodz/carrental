 var express=require("express");

 const { CarMake} = require("../config/database");
  var router = express.Router();
const Op = require("sequelize").Op;

//All carMake
router.get("/", function (request, response) {
    debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarMake.findAll({order:[['Name', 'ASC']]}).then(countries => {
      result.data = countries;
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

//All carMake
router.get("/paging/all", function (request, response) {
    debugger
    var pageSize = request.query.page_size; 
    var page = request.query.page;
    var result = { returnCode: 0, count: 0, data: null, returnMessage: "" };
  search ={
    whare:{IsActive:true},
    order:[]
  }
    if(request.query.search)
    {
      search.where = {
        Name:{ [Op.like]: request.query.search + "%" },
      } 
    }
    else{

      search.order.push(['CreatedOn','DESC']);
    }
  
    CarMake.findAndCountAll(search).then(carmake => {
      debugger
      result.count = carmake.count;
      result.data = carmake.rows.slice((page - 1) * pageSize, page * pageSize);
     result.returnCode = 0;
      result.returnMessage = "Success";
      response.json(result);
      return;
    }).catch(error => {
      debugger
      result.returnCode = -1;
      result.returnMessage = "Server Error";
      response.json(result);
      return;
    });
  });

 //Get By Id
 router.get("/:id",function(request,response){
     debugger
     debugger
     var result = { returnCode: 0, data: null, returnMessage: "" };
     CarMake.findByPk(request.params.id).then(data=>{
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
 })

 //create
 router.post("/create", function (request, response) {
debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarMake.create(request.body).then(carmake => {
      result.data = carmake;
      result.returnMessage = "Success";
      response.json(result);
    }).catch(err => {
      result.returnCode = -1;
      result.returnMessage = "Server Error";
      response.json(result);
    })
  });

//update 
router.post("/update/:id", function (request, response) {
    debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarMake.findByPk(request.params.id).then(carmake => {
      if (carmake != null) {
        carmake.Name = request.body.Name;
        carmake.IsActive=true;
        carmake.save();
        result.data = carmake;
        result.returnMessage = "Success"
      }
      else {
        result.returnCode = -1;
        result.returnMessage = "CarMake is Not Found"
      }
      response.json(result);
    }).catch(err => {
      response.send(err);
    });
  });
  
//delete
router.post("/delete/:id",function(request,response){
    debugger
    var result = { returnCode: 0, data: null, returnMessage: "" };
    CarMake.findByPk(request.params.id).then(carmake=>{
        carmake.IsActive=false;
        carmake.save();
        result.returnCode=1;
        result.returnMessage="Deleted";
    }).catch(err=>{
        result.returnCode=-1;
        result.returnMessage="server error";
    })

})


module.exports = router;

