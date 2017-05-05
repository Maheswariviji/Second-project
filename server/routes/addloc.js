
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var locSchema = mongoose.Schema({
  locID:String,
    cityName: String,
  locName:String,
 });
var Loc = mongoose.model('Loc', locSchema, 'location');

  router.get('/loc', function (req, res) {

    console.log("REACHED loc GET FUNCTION ON SERVER");
    Loc.find({}, function (err, docs) {
         res.json(docs);
    });
});


router.get('/loc/:id', function (req, res) {

    console.log("REACHED Loc GET ID FUNCTION ON SERVER");
     Loc.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/loc', function(req, res){
  console.log(req.body);
  var id = req.body.locID;
  var name = req.body.cityName;
 var loc=req.body.locName;
  var locationpost = new Loc({
    locID : id,
   cityName:name,
   locName:loc,
  });

  locationpost.save(function(err, docs){

    if ( err ) throw err;
    console.log(id);
    console.log("location Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/loc/:id', function(req, res){

   console.log("loc REACHED Delete FUNCTION ON SERVER");

      Loc.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/loc/:id', function(req, res){

    console.log("REACHED PUT");
    console.log(req.body);
    Loc.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
