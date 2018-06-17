"use strict";
let EnroledData = require('./EnroledData');

exports.CountAttendees = (cb) => {
    EnroledData.count({}, (err, count) => {
        if(err){
            return cb(err, 0);    
        };

        return cb(null, count);
    }); 
}

exports.GetAllAttendees = (cb) => {
    EnroledData.find((err, Attendees) => {
        if(err){
            return cb(err);    
        };

        return cb(null, Attendees);
    }); 
}

exports.AddAttendees = (name, cb) => {
    if(name.length > 0) {
        const now = new Date();
        let enroledData = new EnroledData({
              enroledName: name
            , date: now
            , dateString: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`
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