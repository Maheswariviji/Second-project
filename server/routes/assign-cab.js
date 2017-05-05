
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var assigncab = mongoose.Schema({
   bookingID:String,
 city:String,
    cabType: String,
    pickupLoc:String,
    dropLoc:String,
    tripType:String ,
    Name:String,
    phoneNo:String,
    mailId:String,
    Date:String,
    Time:String,
    DriverName:String,
    carNo:String,
    carName:String,
    DriverNo:String,
    Amount:String,
    Drmail:String
 }); 
var assignedCab = mongoose.model('assignedCab', assigncab, 'AssignCab');

  router.get('/cabassign', function (req, res) {

    assignedCab.find({}, function (err, docs) {

         res.json(docs);
    });
});


router.get('/cabassign/:id', function (req, res) {

   
     assignedCab.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/cabassign', function(req, res){
  console.log(req.body);
   var bid = req.body.bookingID;
   var mid=req.body.Drmail;
  var cty=req.body.city;
  var cab = req.body.cabType;
  var locpickup=req.body.pickupLoc;
  var locdrop=req.body.dropLoc;
  var type=req.body.tripType;
  var custName=req.body.Name;
 var no=req.body.phoneNo;
  var id=req.body.mailId;
 var dname=req.body.DriverName;
var cno=req.body.carNo;
var cname=req.body.carName;
 var dno=req.body.DriverNo;
 var dt=req.body.Date;
  var timing=req.body.Time;
  var amt=req.body.Amount;
  var ass = new assignedCab({
     bookingID : bid,
    city:cty,
   Drmail:mid,
   cabType:cab,
   pickupLoc:locpickup,
   dropLoc:locdrop,
tripType:type,
Date:dt,
   Time:timing,
phoneNo:no,
Name:custName,
DriverName:dname,
DriverNo:dno,
carNo:cno,
carName:cname,
mailId:id,
Amount:amt
  });

  ass.save(function(err, docs){

    if ( err ) throw err;
  
    console.log("Booking Successfully");
    res.json(docs);
  });

  })
router.post('/cabassignnow', function(req, res){
  console.log(req.body);
   var bid = req.body.bookingID;
  // var cty=req.body.city;
  var cab = req.body.cabType;
   var mid=req.body.Drmail;
  var locpickup=req.body.pickupLoc;
  var locdrop=req.body.dropLoc;
  var type=req.body.tripType;
  var custName=req.body.Name;
 var no=req.body.phoneNo;
  var id=req.body.mailId;
 var dname=req.body.DriverName;
var cno=req.body.carNo;
var cname=req.body.carName;
 var dno=req.body.DriverNo;
 var dt=req.body.Date;
  var timing=req.body.Time;
  var amt=req.body.Amount;
  var ass = new assignedCab({
    bookingID : bid,
    // city:cty,
   cabType:cab,
   pickupLoc:locpickup,
   dropLoc:locdrop,
       Drmail:mid,
tripType:type,
Date:dt,
   Time:timing,
phoneNo:no,
Name:custName,
DriverName:dname,
DriverNo:dno,
carNo:cno,
carName:cname,
mailId:id,
Amount:amt
  });

  ass.save(function(err, docs){

    if ( err ) throw err;
  
    console.log("Booking  now Successfully");
    res.json(docs);
  });

  })

router.delete('/cabassign/:id', function(req, res){
 console.log(" Deleted ");
assignedCab.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/cabassign/:id', function(req, res){
console.log("REACHED PUT");
    console.log(req.body);
    assignedCab.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;


 