
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
  peakhrfrm:String,
      peakhrto:String,
    carType: String,
    peakhrrate:String,
    normalrate:String
 });
var Car = mongoose.model('Car', carSchema, 'car');


  router.get('/car', function (req, res) {

    console.log("REACHED city GET FUNCTION ON SERVER");
    Car.find({}, function (err, docs) {
         res.json(docs);
    });
});


router.get('/car/:id', function (req, res) {

    console.log("REACHED GET ID FUNCTION ON SERVER");
     Car.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/car', function(req, res){
  console.log(req.body);
  
  // var id = req.body.carID;
  var type = req.body.carType;
  var peakBill= req.body.peakhrrate;
  // var km=req.body.freeKM;
  var frm=req.body.peakhrfrm;
  var to =req.body.peakhrto;
  var normalcharge=req.body.normalrate;
  // var charge=req.body.chargeperKM;
  var cartype = new Car({
    // carID:id,
    carType:type,
    peakhrrate:peakBill,
    peakhrfrm:frm,
    peakhrto:to,
    normalrate:normalcharge
    
  });

  cartype.save(function(err, docs){
if ( err ) throw err;
       console.log("car type created");
    res.json(docs);
  });

  })

router.delete('/car/:id', function(req, res){

   console.log("REACHED Delete FUNCTION ON SERVER");

      Car.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/car/:id', function(req, res){

    console.log("REACHED PUT");
    console.log(req.body);
    Car.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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
