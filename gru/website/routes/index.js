var express = require('express');
var router = express.Router();
var minions = require('../minions');

/* GET home page. */
router.get('/', function(req, res, next) {
  minions.count(function(errCount, minionCount) {
    if (errCount) {
      console.log('minions.count() returned with error'); 
      res.render('index', { title: 'Gru\'s Lab', minionCount: '?' });
    } else {
      res.render('index', { title: 'Gru\'s Lab', minionCount: minionCount });
      minions.play('minions-assemble');
    }
  });
});

router.get('/bedtime', function(req, res, next) {
  minions.play('gru-okay-bedtime');
  minions.bedtime(function(errCount, minionCount) {
    if (errCount) {
      console.log('minions.bedtime() returned with error'); 
      res.render('bedtime', { title: 'Gru\'s Lab', minionSleepCount: '?' });
    } else {
      res.render('bedtime', { title: 'Gru\'s Lab', minionSleepCount: minionCount });
    }
  });
});

module.exports = router;
