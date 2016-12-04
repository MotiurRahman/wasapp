var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var restful = require('node-restful'),
    mongoose = restful.mongoose;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test');





var User = require('./../models/user'); // get our mongoose model



var userCount = 0;
router.get('/', function(req, res, next) {

    if (req.url === '/favicon.ico') {
        console.log('favicon');
        return;
    }
    userCount++;
    // res.writeHead(200, { 'Content-Type': 'text/plain' });
    // res.write('Hello!\n');
    // res.write('We have had ' + userCount + ' visits!\n');
    // res.end();

    res.render("index", { data: userCount });
});



// var auth = function(req, res, next) {
//   if (req.session && req.session.user === "motiur" && req.session.admin)
//     return next();
//   else
//     return res.sendStatus(401);
// };



// var auth = function(req, res, next) {
//   var name = "motiur";
//   var pass = "1234"
//   if (req.body.name ==="motiur" && req.body.pass === "1234")
//     return next();
//   else
//     return res.sendStatus(401);
// };





router.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        name: 'rahman',
        password: '1234',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});


// // create a schema
// var productSchema = new mongoose.Schema({
//   name: String,
//   deviceID: String
// });

// // the schema is useless so far
// // we needsto create a model using it
// var gcmTest = restful.model('mattProduct', productSchema);

// gcmTest.methods(['get','put','post','delete']);

// gcmTest.register(router, '/gcmUpdate');

// Authentication and Authorization Middleware


// Login endpoint
// router.get('/login', function (req, res) {
//  res.render('login');
// });


// Login endpoint
router.post('/authenticate', function(req, res) {
    // console.log("Username:"+req.body.username);
    // console.log("password:"+req.body.password);


    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                //var token = jwt.sign({ foo: 'bar'}, 'shhhhh');

                var token = jwt.sign({ name: 'rahman' }, 'secret', { expiresIn: '1h' });

                // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });


    // if(req.body.username === "motiur" && req.body.password === "1234") {
    //   req.session.user = 'motiur';
    //   req.session.admin = true;
    //   res.redirect('/content');
    // }
    // else{
    //   res.json("login failed!");
    // }
});


// router.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });


// router.use(function(req, res, next) {

//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];


//   // decode token
//   if (token) {

//     // verifies secret and checks exp
//     jwt.verify(token, 'secret', function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//      });


//   } else {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }
// });

/* GET home page. */

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFobWFuIiwiaWF0IjoxNDgwMDA2MDcxLCJleHAiOjE0ODAwMDk2NzF9.D3gzZYnLygFC4HrbpwOcoG0M77Hf6H2fMcqsTyPBGTM

router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});



// Logout endpoint
// router.get('/logout', function (req, res) {
//   req.session.destroy();
//   res.send("logout success!");
// });

// Get content endpoint
// router.get('/content', auth, function (req, res) {
//     res.send("You can only see this after you've logged in.");
// });


module.exports = router;
