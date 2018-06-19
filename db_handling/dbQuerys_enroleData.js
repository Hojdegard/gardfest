"use strict";
let EnroledData = require('./EnroledData');

exports.CountAttendees = (cb) => {
    EnroledData.count({ isAttending: 'true' }, (err, count) => {
        if(err){
            return cb(err, 0);    
        };

        return cb(null, count);
    }); 
}

exports.CountNotAttendees = (cb) => {
    EnroledData.count({ isAttending: 'false' }, (err, count) => {
        if(err){
            return cb(err, 0);    
        };

        return cb(null, count);
    }); 
}

exports.CountRegistered = (cb) => {
    EnroledData.count({}, (err, count) => {
        if(err){
            return cb(err, 0);    
        };

        return cb(null, count);
    }); 
}

exports.GetAllAttendees = (cb) => {
    EnroledData.find({}).sort({ isAttending: -1, enroledName: 1}).exec((err, Attendees) => {
        if(err){
            return cb(err);    
        };

        return cb(null, Attendees);
    }); 
}

exports.AddAttendees = (name, attending, cb) => {
    if(name.length > 0) {
        const now = new Date();
        let enroledData = new EnroledData({
              enroledName: name
            , date: now
            , dateString: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
            , isAttending: attending
        });
        enroledData.save( (err, enroled) => {
            if(err){
                return cb(err);    
            };

            return cb(null, enroled.id);
        })
    }
}

exports.DeleteAttendees = (id, cb) => {
    EnroledData.remove({_id: id}, (err) => {
        if(err){
            return cb(err);    
        };

        return cb(null, true);
    }); 
}