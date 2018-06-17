"use strict";

/* /c/Program/MongoDB/Server/3.2/bin/mongod.exe --dbpath /c/Users/hojde/MinaMongoDB/ */

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/gardfest';
let dbUp = false;

const db = mongoose.connect(dbURI).then(
    () => { console.log("OK") },
    err => { console.log(err) }
  );

if(mongoose.connection !== undefined){
    mongoose.connection.on('connected', function() {
    dbUp = true;
    console.log('db is up!');
});

mongoose.connection.on('error', function(err) {
    dbUp = false;
    console.log('db Error: ' + err);
});

mongoose.connection.on('disconnected', function(){
    dbUp = false;
    console.log('db is disconnected!');
});

mongoose.connection.on('SIGINT', function(){
    mongoose.connection.close(function()
    {
        dbUp = false;
        console.log('Closing db with server.');
        process.exit(0);
    });
});
}

require('./EnroledData');

exports.IsUp = function(){
    return dbUp;
};