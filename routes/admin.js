var express = require('express');
var router = express.Router();
const db = require('../db_handling/db');
const enroledHandler = require('../db_handling/dbQuerys_enroleData');

GetFakeData = () => {
  let fakeArray = [];
  fakeArray.push({ _id: '1',
  enroledName: 'John Doe',
  date: '2018-06-17T16:56:36.306Z',
  dateString: '2018-6-17 - 18:56:36'});
  fakeArray.push({ _id: '2',
  enroledName: 'Jane Deo',
  date: '2018-06-17T16:56:36.306Z',
  dateString: '2018-6-17 - 18:56:36'});

  return fakeArray;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(db.IsUp()){
    enroledHandler.GetAllAttendees((err, data) => {
      if(err){
        res.render('admin', { attending: 0, attendees: GetFakeData() });
      }

      console.log(data);

      res.render('admin', { attending: data.length, attendees: data });
    })
  } else {
    res.render('admin', { attending: 0, attendees: GetFakeData() });
  }
});

router.post('/del', function(req, res, next){

  const buttonPart = 'button-';
if(!db.IsUp() || !req.body.id.startsWith(buttonPart)){
  // Its wrong yes. But don't let them hacks this ;)
  const retData = ({
    valid: false,
  });

  return res.status(200).json(retData);
} else {
  const id = req.body.id.slice(buttonPart.length)
  enroledHandler.DeleteAttendees(id, (err, deleted) => {
    if(err){
      const retData = ({
        valid: true,
        msg: 'del error'
      });

      return res.status(200).json(retData);
    } else {
      const retData = ({
        row: `#row-${id}`,
        valid: deleted,
      });
    
      return res.status(200).json(retData);
    }    
  })
}

});

module.exports = router;
