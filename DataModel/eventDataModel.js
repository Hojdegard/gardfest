"use strict";
exports.CreateEventDataModel = (Author, Title, Explenation, Url, Like) => {
    const dataModel = ({
        title: Title
        , explenation: Explenation
        , url: Url
        , author: Author
        , like: Like
        , date: new Date()
    });

    return dataModel;
}