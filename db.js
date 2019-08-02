
// Set up mongoose connection
var express = require('express');
var app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://127.0.0.1:27017/employess';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB,{useMongoClient: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var str = "";
app.route('/userid').get(function(req, res)

    {
        mongoose.connect(dev_db_url,{useMongoClient: true}, function(err, db) {
       	var collection = db.collection('users');
       	var cursor = collection.find({});
       	str = "";
       	cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    Employee id  " + item.user_id + "</br>";
           }
       	}, function(err) {
           res.send(str);
           db.close();
          }
       	);
   	});
      
});

var server = app.listen(3000, function() {}); 