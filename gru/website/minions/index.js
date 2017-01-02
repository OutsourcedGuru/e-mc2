'use strict';

var child_process = require('child_process');
var path = require('path');
var minions = exports;

exports.checkIfOn = function(minion, callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  var commands, childD;
  commands = [ '-c', 1, minion];
  childD = child_process.spawn('ping', commands);
  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  childD.stdout.on('data', function(data) {
    console.log('PING output: ' + data);
  });

  childD.stdout.on('close', function(code) {
    console.log('PING return: ' + code);
    if (code !== 0) {
      callback(null, 1);
    } else {
      callback(null, 0);
    }
  });
  // End of checkIfOn()
}

minions.count = function(callback) {
  var minionCount = 0;
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  minions.checkIfOn('bob.local', function(errBob, count) {
    if (errBob) console.log('checkIfOn(bob.local) returned err');
    minionCount += count;

    minions.checkIfOn('kevin.local', function(errKevin, count) {
      if (errKevin) console.log('checkIfOn(kevin.local) returned err');
      minionCount += count;

      minions.checkIfOn('dave.local', function(errDave, count) {
        if (errDave) console.log('checkIfOn(dave.local) returned err');
        minionCount += count;

        callback(null, minionCount);
      });
    });
  });
}
