var express = require("express");
const {
  sequelize,
  User,
  Role,
  UserProfile,
  AgencyProfile
} = require("../config/database");
const Op = require("sequelize").Op;
const Sequelize = require('sequelize');
var router =express.Router();



router.get("/", function (request, response) {
  var pageSize = request.query.page_size;
  var page = request.query.page;
  var search = {
    where: {},
    include: [{
        model: Role
      },
      {
        model: UserProfile
      }
    ]
  };
  debugger
  if (request.query.search != null) {

    var n = request.query.search.indexOf("@");
    if (n != -1) {
      if (request.query.agency) {
        search.where = {
          Email: {
            [Op.like]: request.query.search + "%"
          },
          AgencyId: request.query.agency
        };
      } else {
        search.where = {
          Email: {
            [Op.like]: request.query.search + "%"
          },
        };
      }
    } else {

      if (request.query.agency) {
        search.include[1].where = {
          FirstName: {
            [Op.like]: request.query.search + "%"
          },
          [Op.or]: {
            LastName: {
              [Op.like]: request.query.search + "%"
            }
          },
          AgencyId: request.query.agency
        };
      } else {
        search.include[1].where = {
          FirstName: {
            [Op.like]: request.query.search + "%"
          },
          [Op.or]: {
            LastName: {
              [Op.like]: request.query.search + "%"
            }
          }
        };
      }
    }
  } else {
    if (request.query.agency) {
      search.where = {
        AgencyId: request.query.agency
      }
    }
  }

  var result = {
    returnCode: 0,
    count: 0,
    data: null,
    returnMessage: ""
  };
  User.findAndCount(search).then(model => {
    debugger
    result.count = model.count;
    result.data = model.rows.slice((page - 1) * pageSize, page * pageSize);
    result.returnCode = 0;
    response.json(result);
  }).catch(err => {
    debugger
    response.send(err);
  })
});


//Get all User
router.get("/venderall",function (request,responce){
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findAll({where:{RoleId:3,IsApproved:true,IsEmailVerified:true},include:[{model:UserProfile}]}).then(vender=>{
    result.returnCode=1;
    result.returnMessage="Successfull";
    result.data=vender;
    responce.json(result);
  }).catch(err=>{
    result.returnCode=-1;
    result.returnMessage="server Error";
    responce.json(result);
  })

})


// Add user
router.post("/create", function (request, response) {
  debugger;
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  //request.body.Password = EncriptionHelper.Ecription(request.body.Password);
  //request.body.EmailVerificationId = GetUID.GenerateUID();

  User.create(request.body, {
    include: [{
      model: UserProfile
    }]
  }).then(user => {
    debugger
    //EmailHelper.Registration(user.Email, user.EmailVerificationId);
    result.returnCode = 0;
    result.data = user;
    result.returnMessage = "Success";
    response.json(result);
  }).catch(err => {
    debugger
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  })
});

//Get users by id
router.get("/:id", function (request, response) {
  debugger
  var result = {
    returnCode: 0,
    count: 0,
    data: null,
    returnMessage: ""
  };
  User.findByPk(request.param.id ,{include:[{model:Role},{model:UserProfile},{
    model: AgencyProfile
  }]}).then(model => {

    debugger
    if (model) {
     // model.Password = EncriptionHelper.Decription(model.Password);
      result.data = model
      result.returnCode = 0;
      response.json(result);
    } else {
      result.returnCode = -1;
      result.returnMessage = "User not found"
      response.json(result);
    }
  }).catch(err => {
    response.send(err);
  })
});
//activate the user
router.post("/activate", function (request, response) {
  //debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findByPk(request.body.Id).then(user => {
    if (user != null) {
      user.IsActive = true;
      user.save();
      result.returnMessage = "Success"
    } else {
      result.returnCode = -1;
      result.returnMessage = "User not found"
    }
    response.json(result);
  }).catch(err => {
    response.send(err);
  })
});
//Bloack The user
router.post("/block", function (request, response) {
  //debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findByPk(request.body.Id).then(user => {
    if (user != null) {
      user.IsBlocked = request.body.IsBlocked;
      user.save();
      if (request.body.IsBlocked) {
        result.returnMessage = "User has blocked";
      } else {
        result.returnMessage = "User has unblocked"
      }
    } else {
      result.returnCode = -1;
      result.returnMessage = "User not found"
    }

    response.json(result);
  }).catch(err => {
    response.send(err);
  })
});
//Approved the user
router.post("/approve", function (request, response) {
  //debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findByPk(request.body.Id).then(user => {
    if (user != null) {
      user.IsApproved = request.body.IsApproved;
      user.save();
      if (request.body.IsApproved) {
        result.returnMessage = "User has approved";
      } else {
        result.returnMessage = "User has unapproved"
      }
    } else {
      result.returnCode = -1;
      result.returnMessage = "User not found";
    }

    response.json(result);
  }).catch(err => {
    response.send(err);
  })
});
//Deactivate the user 
router.post("/deactivate", function (request, response) {
  //debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findByPk(request.body.Id).then(user => {
    if (user != null) {
      user.IsActive = false;
      user.save();
      result.returnMessage = "Success"
    } else {
      result.returnCode = -1;
      result.returnMessage = "User not found"
    }
    response.json(result);
  }).catch(err => {
    response.send(err);
  })
});
//check Exist email
router.post("/emailexist", function (request, response) {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findOne({
    where: {
      Email: request.body.Email,
      Id: {
        [Op.ne]: request.body.Id
      }
    }
  }).then(user => {
    if (user == null) {
      result.returnCode = 0;
      result.returnMessage = "User not exists";
    } else {
      result.returnCode = -1;
      result.returnMessage = "User already exist";
    }
    response.json(result);
  }).catch(err => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  });
});


// login api
router.post("/login", function (request, response) {
  debugger
  var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };
  User.findOne({
    where: {
      Email: request.body.Email,
      IsActive: true
    },
    include: [{
      model: UserProfile
    }, {
      model: AgencyProfile
    }]
  }).then(user => {
    if (user == null) {
      result.returnCode = -1;
      result.returnMessage = "Invalid Credentials.";
    } else if (user.IsEmailVerified == false) {
      result.returnCode = -1;
      result.returnMessage = "Email is not verified.";
    } else if (user.IsActive == false) {
      result.returnCode = -1;
      result.returnMessage = "Account is not active.";
    } else {
      debugger;
      //var password = EncriptionHelper.Decription(user.Password);
      var password=user.Password;
      if (password == request.body.Password) {
        result.returnMessage = "Success";
        user.Password = password;
        result.data = user;
      } else {
        result.returnCode = -1;
        result.returnMessage = "Invalid Password";
      }
    }
    response.json(result);
  }).catch(err => {
    result.returnCode = -1;
    result.returnMessage = "Server Error";
    response.json(result);
  });
});





module.exports = router;
