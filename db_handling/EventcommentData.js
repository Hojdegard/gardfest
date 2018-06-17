"use strict";
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const sEventType = 'EventType';
const sCommentType = 'CommentType';

let eventCommentDataSchema = new Schema({
    parentType: String
    , parentId: String
    , comment: String
    , author: String
    , like: Number
    , date: Date
});


let EventCommentData = mongoose.model('EventCommentData', eventCommentDataSchema);

module.exports = EventCommentData;
exports.sEventType = sEventType;
exports.sCommentType = sCommentType;