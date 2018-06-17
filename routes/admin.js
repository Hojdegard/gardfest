var express = require('express');
var router = express.Router();
const db = require('../db_handling/db');
const enroledHandler = require('../db_handling/dbQuerys_enroleData');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(db.IsUp){
    enroledHandler.GetAllAttendees((err, data) => {
      if(err){
        res.render('admin', { attending: 0, attendees: null });
      }

      console.log(data);

      res.render('admin', { attending: data.length, attendees: data });
    })
  } else {
    res.render('admin', { attending: 0, attendees: null });
  }
});

router.post('/del', function(req, res, next){

  const buttonPart = 'button-';
if(!req.body.id.startsWith(buttonPart)){
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
