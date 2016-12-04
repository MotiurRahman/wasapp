var express = require('express');
var router = express.Router();
var restful = require('node-restful'),
    mongoose = restful.mongoose;
    mongoose.Promise = global.Promise;
    mongoose.createConnection('mongodb://localhost:27017/test');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// create a schema
var productSchema = new mongoose.Schema({
  name: String,
  title: String
});

// the schema is useless so far
// we needsto create a model using it
var gcmTest = restful.model('mattProduct', productSchema);

gcmTest.methods(['get','put','post','delete']);

gcmTest.register(router, '/gcmUpdate');

// Authentication and Authorization Middleware



module.exports = router;
