var express=require("express");
const {
    CarType
}=require("../config/database")

var router=express.Router();

var result = {
    returnCode: 0,
    data: null,
    returnMessage: ""
  };

//Get all the Data
router.get('/all',(req,res)=>{
    debugger
      CarType.findAll({where :{IsActive:true}}).then(cartype=>{
          if(cartype!=null)
          {
              result.returnCode=1;
              result.data=cartype;
              result.returnMessage="Successfull";
              return res.json(result);
          }
      }).catch(err=>{
          result.returnCode=-1;
          result.returnMessage("Server Error");
          return res.json(result);
      })
})

//get by Id
router.get('/:Id',(req,res)=>{
    debugger
  
      CarType.findByPk(req.params.Id).then(cartype=>{
          if(cartype!=null)
          {
              result.returnCode=1;
              result.returnMessage="Success";
              result.data=cartype;
              return res.json(cartype);
          }
      }).catch(err=>{
          result.returnCode=-1;
          result.returnMessage="Server Error";
          return res.json(result);
      })
})

//Save the data

router.post('/save',(req,res)=>{
    debugger
    CarType.create(req.body).then(cartype=>{
        result.data=cartype;
        result.returnMessage="Sucess";
        result.returnCode=1;
        return res.json(result)
    }).catch(err=>{
        result.returnMessage="Server Error";
        result.returnCode=-1;
        return res.json(result);
    })
})

//update data

router.post('/update',(req,res)=>{
    debugger
    CarType.findByPk(req.body.Id).then(cartype =>{
        cartype.Name=req.body.Name;
        cartype.Image=req.body.Image;
        cartype.LargeImage=req.body.LargeImage;
        cartype.SmallImage=req.body.SmallImage;
        cartype.IsActive=req.body.IsActive;
        cartype.save();
        result.returnCode=1;
        result.returnMessage="success";
        result.data=cartype;
        return res.json(result);
    }).catch(err=>{
        result.returnMessage="server error";
        result.returnCode=-1;
    })
})
// Delete data 
router.post('/delete/:Id',(req,res)=>{
    debugger
    CarType.findByPk(req.params.Id).then(cartype=>{
        if(cartype!=null)
        { 
            cartype.IsActive=false;
            cartype.save();
            result.returnMessage="Success";
            result.returnCode=1;
            return res.json(result);
        }
        else
        {
            result.returnMessage("User not Found");
            return res.json(result);
        }
    
        
    }).catch(err=>{
        result.returnMessage="server Error";
        result.returnCode=-1;
        return res.json(result);
    })
})

module.exports = router;

