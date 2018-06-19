var express = require('express');
var router = express.Router();
const db = require('../db_handling/db');
const enroledHandler = require('../db_handling/dbQuerys_enroleData');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(db.IsUp()){
    enroledHandler.CountAttendees((err, count) => {
      if(err){
        res.render('register', { attending: -1 });
      }

      res.render('register', { attending: count.toString() });
    })
  } else {
    res.render('register', { attending: 'No working DB' });
  }
});

router.post('/comming', function(req, res, next){
  
  if(db.IsUp()){
    enroledHandler.AddAttendees( req.body.name, req.body.submited, (err, data) => {
      if(err){
        return res.status(500).send(err);
      }
    
      enroledHandler.CountAttendees((countErr, count) => {
        if(countErr){
          return res.status(500).send(err);
        }       
        
        const retData = ({
            name: countErr ? 'countErr' : req.body.name,
            nrAttendees: count,
            valid: countErr ? false : true,
            isAttending: req.body.submited == 'true'
        });

        console.log(retData);
    
        return res.status(200).json(retData);
      })

  })} else {
    return res.status(500).send(err);
  }
});

module.exports = router;
