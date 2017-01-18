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
      //minions.play('minions-assemble');
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

router.get('/beacon/:direction', function(req, res, next) {
  var totalMinions = 3;
  if (req.params.direction == 'up')
    minions.play('minions-assemble');
  minions.beacon(req.params.direction == 'up', function(errCount, minionCount) {
    if (errCount) {
      console.log('minions.beacon() returned with error'); 
      res.render('beacon', { title: 'Gru\'s Lab', minionBeaconCount: '?', direction: '?' });
    } else {
      res.render('beacon', {
        title: 'Gru\'s Lab',
        minionBeaconCount: req.params.direction == 'up' ? minionCount : totalMinions - minionCount,
        direction: req.params.direction ? 'up' : 'down' });
    }
  });
});

module.exports = router;
