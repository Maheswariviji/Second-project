var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
    ID: String,
    city:String,
    location:String,
     carType: String,
    minBill:String,
    freeKM:String,
    waitingCharge:String,
    chargeperKM:String
 });
var Mapping = mongoose.model('Mapping', mapSchema, 'mapcitycar');
  router.get('/map', function (req, res) {

    console.log("get mapping details");
    Mapping.find({}, function (err, docs) {
         res.json(docs);
    });
});


router.get('/map/:id', function (req, res) {

    console.log("get mapping details based on id");
     Mapping.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/map', function(req, res){
  console.log(req.body);
   
  var id = req.body.ID;
  var dis=req.body.city;
  // var loc=req.body.location;
    var type = req.body.carType;
  var mBill= req.body.minBill;
  var km=req.body.freeKM;
  var wcharge=req.body.waitingCharge;
  var charge=req.body.chargeperKM;

  var mappingdetails = new Mapping({
 ID:id,
    city:dis,
    // location:loc,
    carType:type,
   minBill:mBill,
    freeKM:km,
    waitingCharge:wcharge,
    chargeperKM:charge
  });

  mappingdetails.save(function(err, docs){

    if ( err ) throw err;
    console.log(id);
    console.log("mapping car with city");
    res.json(docs);
  });

  })

router.delete('/map/:id', function(req, res){

   console.log("DELETE Mapping ON SERVER");

      Mapping.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/map/:id', function(req, res){

    console.log("REACHED MAPPING");
    console.log(req.body);
    Mapping.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
