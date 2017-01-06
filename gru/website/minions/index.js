'use strict';

var child_process = require('child_process');
var path = require('path');
var minions = exports;
var ping = require('ping');

exports.play = function(wav, callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  var commands, childD, wavFile;
  wavFile = '/home/pi/audio/' + wav + '.wav';
  // aplay ~/audio/gru-okay-bedtime.wav
  commands = [ wavFile ];
  childD = child_process.spawn('/usr/bin/aplay', commands);
  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  childD.stdout.on('data', function(data) {
    console.log('aplay output: ' + data);
  });

  childD.stderr.on('data', function(data) {
    console.log('aplay error: ' + data);
  });

  childD.stdout.on('close', function(code) {
    console.log('aplay return: ' + code);
    if (code == 0) {
      callback(null, 1);
    } else {
      callback(null, 0);
    }
  });
  // End of play()
}


exports.bedtimeFor = function(minion, callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  var commands, childD, userAtHostname;
  userAtHostname = 'pi@' + minion;
  // sshpass -p 'Minions' ssh pi@dave 'sudo poweroff'
  commands = [ '-p', 'Minions', 'ssh', userAtHostname, 'sudo poweroff'];
  childD = child_process.spawn('sshpass', commands);
  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  childD.stdout.on('data', function(data) {
    console.log('poweroff output: ' + data);
  });

  childD.stdout.on('close', function(code) {
    console.log('poweroff return: ' + code);
    if (code == 0) {
      callback(null, 1);
    } else {
      callback(null, 0);
    }
  });
  // End of bedtimeFor()
}

minions.bedtime = function(callback) {
  var minionCount = 0;
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  minions.bedtimeFor('bob', function(errBob, count) {
    minionCount += count;

    minions.bedtimeFor('kevin', function(errKevin, count) {
      minionCount += count;

      minions.bedtimeFor('dave', function(errDave, count) {
        minionCount += count;

        callback(null, minionCount);
      });
    });
  });
  // End of bedtime()
}

exports.checkIfOn = function(minion, callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  ping.sys.probe(minion, function(isAlive) {
    if (isAlive)
      callback(null, 1);
    else
      callback(null, 0);
  });
  // End of checkIfOn()
}

minions.count = function(callback) {
  var minionCount = 0;
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  minions.checkIfOn('bob', function(errBob, count) {
    minionCount += count;

    minions.checkIfOn('kevin', function(errKevin, count) {
      minionCount += count;

      minions.checkIfOn('dave', function(errDave, count) {
        minionCount += count;

        callback(null, minionCount);
      });
    });
  });
  // End of count()
}
