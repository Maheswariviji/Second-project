
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var TheatreSchema = mongoose.Schema({
    theatreID: String,
    theatreName: String,
    city: String
 });
var Theatre = mongoose.model('Theatre', TheatreSchema, 'theatre');



//Master
  router.get('/getTheatre', function (req, res) {
    console.log("REACHED theatre GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);         
    });
});

  router.get('/getTheatre/:id', function (req, res) {
    console.log("REACHED theatre GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addTheatre', function(req, res){
  console.log(req.body);
  var id = req.body.theatreID;
  var theatreName = req.body.theatreName;
  var cityName = req.body.cityName;

  var theatre = new Theatre({
    theatreID : id,
    theatreName:theatreName,
    city: cityName   
  });

console.log(theatre);
  theatre.save(function(err, docs){
    if ( err ) throw err;
    console.log("Theatre Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteTheatre/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateTheatre/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;