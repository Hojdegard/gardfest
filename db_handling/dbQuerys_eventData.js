"use strict";
let EventData = require('./EventData');

exports.CountEvent = (cb) => {
    EventData.count({}, (err, count) => {
        if(err){
            return cb(err, 0);    
        };

        return cb(null, count);
    }); 
}

exports.GetAllEvents = (cb) => {
    EventData.find((err, Events) => {
        if(err){
            return cb(err);    
        };

        return cb(null, Events);
    }); 
}

exports.AddEvent = (event, cb) => {
    if(event.title.length > 0) {
        let eventData = new EventData({
            title: event.title
            , explenation: event.explenation
            , url: event.url
            , author: event.author
            , date: event.date
        });
        eventData.save( (err, event) => {
            if(err){
                return cb(err);    
            };

            return cb(null, event);
        })
    }
}

exports.DeleteEvent = (id, cb) => {
    EventData.remove({_id: id}, (err) => {
        if(err){
            return cb(err);    
        };

        return cb(null, true);
    }); 
}