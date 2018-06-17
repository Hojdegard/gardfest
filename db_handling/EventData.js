"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let eventDataSchema = new Schema({
    title: String
    , explenation: String
    , url: String
    , author: String
    , like: Number
    , date: Date
});


let EventData = mongoose.model('EventData', eventDataSchema);

module.exports = EventData;