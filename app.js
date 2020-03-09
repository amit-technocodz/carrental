var express = require("express");
var path =require("path");
var port = process.env.PORT || 6003;
var https = require('https');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var dbconn=require("../CarFlexi/config/database");


//enable cross
var cors = require('cors');

//setting environemnt variable
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//ROUTES of API
var cartyperoutes= require("./routes/cartype");
var uploadImages =require ("./routes/upload-images");
var user=require("./routes/user");
var country=require("./routes/country");
var city =require("./routes/city");
var locality=require("./routes/locality");
var carmake=require("./routes/carmake");
var carmodel=require("./routes/carmodel");
var carregistration=require("./routes/carregistartion");
var carrentalprice=require("./routes/carrentalprice");
var carrental=require("./routes/carrent");
var bookingstatus=require("./routes/bookingstatus");
var Paymentstatatus=require("./routes/paymentstatus");



 var app = express();
app.use(function(res,req,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//SESSION USE
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(express.json({
  limit: "6mb"
}));


app.use(cors());

app.use(express.static(path.join(__dirname, "/dist/CarFlexi")));
app.use(express.static(path.join(__dirname, "/")));


//This is User For create The Api Path
app.use("/api/cartype",cartyperoutes);
app.use("/api/uploadimage",uploadImages);
app.use("/api/user",user);
app.use("/api/city",city);
app.use("/api/country",country);
app.use("/api/locality",locality);
app.use("/api/carmake",carmake);
app.use("/api/carmodel",carmodel);
app.use("/api/carregistation",carregistration);
app.use("/api/carrentalprice",carrentalprice);
app.use("/api/carrental",carrental);
app.use("/api/bookingstatus",bookingstatus);
app.use("/api/paymentstatus",Paymentstatatus);



//server send event
app.get('/events', (req, res) => {
    debugger
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    // send a ping approx every 2 seconds
    const timer = setInterval(() => {
      res.write('data: ping\n\n');
   
      // !!! this is the important part
      res.flush();
    }, 2000);
   
    res.on('close', () => {
      clearInterval(timer)
    })
  });
  
  //sending only index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/dist/CarFlexi/index.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "/dist/CarFlexi/index.html")));



//listen the app
app.listen(port, function () {
console.log("App is listening on port:" + port);
  });
