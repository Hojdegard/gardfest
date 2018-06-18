var express = require('express');
var router = express.Router();
const db = require('../db_handling/db');
const eventDataModel = require('../DataModel/eventDataModel');
const eventHandler = require('../db_handling/dbQuerys_eventData');

/*
const dataModel = ({
        title: Title
        , explenation: Explenation
        , url: Url
        , author: Author
        , like: Like
        , date: new Date()
    });
*/

GetFakeData = () => {
  let fakeArray = [];
  
  fakeArray.push({ _id: '1',
  title: 'Paintboll',
  author: 'John Doe',
  url: '',
  explenation: 'Skoj att skjuta',
  like: 0});
  
  fakeArray.push({ _id: '2',
  title: 'Programera',
  author: 'Jane Deo',
  url: '',
  explenation: 'Ibland borde man fixa ordentligt. Istället för det här...',
  like: 10})

  return fakeArray;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(db.IsUp()){
    eventHandler.GetAllEvents((err, event) => {
      if(err){
        res.render('event', { events: GetFakeData() });
      }

      res.render('event', { events: event});
    })
  } else {
    res.render('event', { events: GetFakeData() });
  }
});

MakeEventDataModel = (body) => {
  return eventDataModel.CreateEventDataModel(
    body.author
    , body.title
    , body.explenation
    , body.url
    , 0
  );
}

router.post('/add', function(req, res, next){  
  if(db.IsUp()){
    eventHandler.AddEvent( MakeEventDataModel(req.body), (err, data) => {
      if(err){
        const retData = ({
          valid: false,
          msg: 'Error after adding'
        });
        return res.status(200).json(retData);
      }

      console.log(data);
      const retData = ({
          valid: true,
      });

      return res.status(200).json(retData);
    })
  } else {
      const retData = ({
        valid: false,
        msg: 'No DB'
    });
    return res.status(200).json(retData);
  }
});

router.post('/del', function(req, res, next){

  const buttonPart = 'del-';
if(!req.body.id.startsWith(buttonPart)){
  // Its wrong yes. But don't let them hacks this ;)
  const retData = ({
    valid: false,
  });

  return res.status(200).json(retData);
} else {
  const id = req.body.id.slice(buttonPart.length)
  eventHandler.DeleteEvent(id, (err, deleted) => {
    if(err){
      const retData = ({
        valid: true,
        msg: 'del error'
      });

      return res.status(200).json(retData);
    } else {
      const retData = ({
        row: `#eventblock-${id}`,
        valid: deleted,
      });
    
      return res.status(200).json(retData);
      }    
    })
  }
})

module.exports = router;
