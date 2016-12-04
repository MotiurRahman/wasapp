var express = require('express');
var router = express.Router();
var restful = require('node-restful'),
    mongoose = restful.mongoose;

mongoose.createConnection('mongodb://localhost:27017/test');

var login = require('./../models/myTable');



router.get('/insert', function(req, res) {
    // console.log("Username:"+req.body.username);
    // console.log("password:"+req.body.password);

    login.find({}).exec(function(err, data) {
        if (err) {
            res.json(error)
            mongoose.connection.close();
        } else {
            res.json(data)
        }

    });


});


router.post('/insert', function(req, res) {
    // console.log("Username:"+req.body.username);
    // console.log("password:"+req.body.password);

    var name = req.body.name;
    var password = req.body.password;


    var loginData = {
        name: name,
        password: password

    };

    //res.json(was_Data)

    var loginInfo = new login(loginData);
    loginInfo.save(function(error, data) {

        if (error) {
            res.json(error)
            mongoose.connection.close();
        } else {
            res.json(data)

        }


    });



});



module.exports = router;
