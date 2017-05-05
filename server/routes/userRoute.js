var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
console.log(User);
var jwt = require('jsonwebtoken');


router.get('/getuser', function (req, res) {

    console.log("get details");
    User.find({}, function (err, docs) {
         res.json(docs);
         console.log(res);
    });
});

router.post('/signup', function(req, res) {
    var newUser = new User();
    newUser.FirstName = req.body.FirstName;
    // newUser.LastName = req.body.LastName;
    newUser.MobileNumber = req.body.MobileNumber;
    newUser.Email = req.body.Email;
    newUser.Role=req.body.Role;
    newUser.Password = newUser.generateHash(req.body.Password);
    newUser.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            });
            console.log('Signup Called');
        }
    });
});

router.post('/login', function(req, res) {
    User.findOne({
        Email: req.body.Email
    }, function(err, user) {
        console.log(err);
        console.log(user);
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'secret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log(token);
           
        }
    });
});

module.exports = router;
