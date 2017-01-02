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
    }
  });
});

module.exports = router;
