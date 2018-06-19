"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let enroledDataSchema = new Schema({
    enroledName: String
    , dateString: String
    , date: Date
    , isAttending: String
});

let EnroledData = mongoose.model('EnroledData', enroledDataSchema);

module.exports = EnroledData;