var express = require('express');
var router = express.Router();
var Driver = require('../models/driver.js');
var jwt = require('jsonwebtoken');

  router.get('/der', function (req, res) {

    console.log("get driver details");
    Driver.find({}, function (err, docs) {
         res.json(docs);
    });
});


router.get('/der/:id', function (req, res) {

    console.log("get driver details based on id");
     Driver.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/d', function(req, res){
  // console.log(req.body);
  var dr=new Driver();
  // var id = req.body.driverID;
  dr.city=req.body.city;
  // var loc=req.body.location;
  dr.Role=req.body.Role;
  dr.FirstName=req.body.FirstName;
  dr.Address=req.body.Address;
  dr.carType = req.body.carType;
  dr.carName= req.body.carName;
  dr.carNumber=req.body.carNumber;
  dr.MobileNumber=req.body.MobileNumber;
   dr.licenseNo=req.body.licenseNo;
    dr.Email=req.body.Email;
  // var pwd=req.body.password;
  dr.Password=dr.generateHash(req.body.Password)
  dr.cpwd=dr.generateHash(req.body.cpwd);
  // var driverdetails = new Driver({
  //   // driverID:id,
  //   city:dis,
  //   // location:loc,
  //   driverName:name,
  //   Address:addr,
  //   carType:type,
  //   carName:cname,
  //   carNumber:no,
  //   Lno:licenseNo,
  //   pno:phoneno,
  //   mid:mailID,
  //   password:pwd,
  //   cpwd:confirmpwd
  // });

 //  dr.save(function(err, docs){
 // if ( err ) throw err;
 //    // console.log(id);
 //    console.log("Driver created");
 //    res.json(docs);
 //  });

dr.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
                // details:res
            });
            console.log('Driver created');
        }
    });

  });

router.delete('/der/:id', function(req, res){

   console.log("DELETE DRIVER ON SERVER");

      Driver.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/der/:id', function(req, res){

    console.log("REACHED DRIVER");
    console.log(req.body);
    Driver.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
// router.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


router.post('/dl', function(req, res) {
  console.log(req.body);
    Driver.findOne({
       
        Email: req.body.Email
    }, function(err, driver) {
       console.log(err);
        console.log(driver);
        if (err) {
            res.json(err);
        } else if (!driver) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!driver.validPassword(req.body.Password)) {
          
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (driver) {
            var token = jwt.sign(driver, 'secret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: driver
            });
            console.log(token);
           
        }
    });
});


module.exports = router;
