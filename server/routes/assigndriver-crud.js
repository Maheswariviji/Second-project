
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var assign = mongoose.Schema({
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
    Time:String
 }); 
var Assign = mongoose.model('Assign', assign, 'AssignDriver');

  router.get('/ass', function (req, res) {

    console.log("Reached Assigning in server");
    Assign.find({}, function (err, docs) {

         res.json(docs);
    });
});


router.get('/ass/:id', function (req, res) {

    console.log("Reached Assigning in server based on id");
     Assign.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/ass', function(req, res){
  console.log(req.body);
  var bid = req.body.bookingID;
  var cty=req.body.city;
  var cab = req.body.cabType;
  var locpickup=req.body.pickupLoc;
  var locdrop=req.body.dropLoc;
  var type=req.body.tripType;
  var custName=req.body.Name;
 var no=req.body.phoneNo;
 // var id=req.body.mailId;
 var dt=req.body.Date;
  var timing=req.body.Time;
  var cab = new Assign({
    bookingID : bid,
    city:cty,
   cabType:cab,
   pickupLoc:locpickup,
   dropLoc:locdrop,
tripType:type,
Date:dt,
   Time:timing,
phoneNo:no,
Name:custName
// mailId:id
  });

  cab.save(function(err, docs){

    if ( err ) throw err;
  
    console.log("Booking Successfully");
    res.json(docs);
  });

  })

router.delete('/ass/:id', function(req, res){
 console.log(" Deleted ");
Assign.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/ass/:id', function(req, res){
console.log("REACHED PUT");
    console.log(req.body);
    Assign.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
