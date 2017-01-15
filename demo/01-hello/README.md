# Step-by-step Instructions for Creating "Hello, Minions!"
![waving-minions](https://cloud.githubusercontent.com/assets/15971213/21579836/46e123d2-cf7a-11e6-89e4-e2b6c593ab4e.jpg)

Here, we continue our setup so that we can do our supercomputer version of the ubiquitous **Hello, World!** first program for any new language.

## Node.js
Since *JavaScript is the new black*, so to speak, I prefer to do things in this language if possible and Node.js then is the obvious choice.

> There are a few Python-based supercomputer programs and platforms out there but I don't do prefer coding in that language, to be honest.

> And although I have a long history of coding in C and C++ and there are plenty of supercomputer samples in those languages as well, I guess I'm saying "goodbye" in a way to familiar/older languages and sticking with the newer C#, JavaScript and such.

> Finally, Java remains a popular language despite the number of security-related issues it opens up and yet I remain firm in shunning this one.

## klyng
The underlying Node.js module we're using initially is called [klyng](https://www.npmjs.com/package/klyng) and it's created by Mostafa Samir.  Although there hasn't been a lot of releases, it looks like a great starting point.

It's based upon the [Message Passing Interface (MPI)](https://en.wikipedia.org/wiki/Message_Passing_Interface) so it's a standard at least for inter-node supercomputer communications.

> A competing-yet-popular alternative to MPI is the [MapReduce](https://en.wikipedia.org/wiki/MapReduce) coding model for supercomputers, as recently popularized by Google.  Perhaps the biggest reason that I'm not using this one is that it's distributed as Apache Hadoop and this is built on Python.  And I've already discussed Python above as a non-preference.

Note that we installed **klyng** globally on the `dave` image that was cloned for each node so each should have the executable at this point.

## Fix Things
It looks like `klyng` can't be found from the command line so I'll be re-installing it on `gru`.

```
$ sudo npm uninstall -g klyng
$ sudo bash
#   Note that we're now logged in as root and the
#   prompt has changed to root@gru:/home/pi# so
#   just copy/run everything after the prompt.
root@gru:/home/pi# NPM_CONFIG_PREFIX=/home/pi/.npm-modules npm install -g klyng
root@gru:/home/pi# exit
$ cd /media/pi/usb/share
$ mkdir 01-hello
#   Noting that we can't install this (yet) directly
#   under a removable-media mount point because the
#   npm install for klyng includes software which
#   doesn't allow this.
$ cd ~
$ mkdir demo/01-hello -p
$ cd demo/01-hello
$ npm init
    name: hello
    version: 1.0.0
    description: The ubiquitous Hello, World! program,    rendered for supercomputers.
    entry point: hello.js
    test command:
    keywords: 
    author: Outsourced Guru
    license: MIT
$ npm install klyng --save
$ curl -o hello.js https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/demo/01-hello/hello.js
#   Hopefully this works
$ klyng -n 2 hello.js
Hello, I'm process 0-2
Hello, I'm process 1-2
```

That's a good sign.  So the `klyng` command was found and we were able to run two instances of itself locally on `gru`.  So the next step is to then run it on the minions.

## Minions assemble...!
In order to distribute the job across all nodes we'll need to pull down a json list file to `gru`.  While we're at it, we might as well fire up the `klyng` beacon on `gru` so that he can also do work.

```
$ curl -o ~/demo/01-hello/minionlistfile https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/demo/01-hello/minionlistfile

$ klyng --beacon-up
The beacon is now up and listening.
```

Now repeat the following for each minion, remoting into each one first and remembering that it needs to be run with `sudo` for the minions:

```
$ sudo klyng --beacon-up
```

And now back to `gru`, tell everyone to run the JavaScript file in Node.js.

```
#   Note that each Pi has four cores so 4x4=16 instances
$ klyng -n 16 hello.js -m minionlistfile
pi@gru:~/demo/01-hello $ klyng -n 16 hello.js -m minionlistfile
Hello, I'm process 0-16
Hello, I'm process 1-16
Hello, I'm process 2-16
Hello, I'm process 3-16
Hello, I'm process 12-16
Hello, I'm process 4-16
Hello, I'm process 13-16
Hello, I'm process 5-16
Hello, I'm process 15-16
Hello, I'm process 14-16
Hello, I'm process 6-16
Hello, I'm process 7-16
Hello, I'm process 8-16
Hello, I'm process 9-16
Hello, I'm process 10-16
Hello, I'm process 11-16
```

In case you're interested, this took 42 seconds on my e=mc<sup>2</sup> system for 16 instances and if I dedicated `gru` to just distributing the work, it took 39 seconds for 12 remote-only instances.  Running locally 4 (or even 16) instances on `gru` it completed in a mere 3 seconds!  I believe the conclusion here is that the biggest overhead is packaging the code and shipping it to the minions to run.

Continuing that thought with ten times as many instances:  18 seconds for 160 locally on `gru` version a mere 33 seconds for 160 remotely/locally.  **So it scales well when we increase the number of instances—we get a pay-back for the time investment it took to package and distribute the code.**

And also remember that the ratio of added code versus our code was high since this was such a trivial example. 

## Looking under the hood
Remote now into one of the minions and let's see how the code was distributed.

```
$ ls /usr/lib/node_modules/klyng/.unpacks
app_1484455926517.js
#   Look at just one of them (if there are several)
$ cat "/usr/lib/node_modules/klyng/.unpacks/$(ls /usr/lib/node_modules/klyng/.unpacks | tail -n1)"
```

This should demonstrate how your own code is wrapped with the required methods for `klyng` and its underlying `fibers` code.  This also explains the overhead for packaging everything, pushing it to the minions and having them execute it.

## Turn off those beacons, I guess
Not quite sure yet, but for now let's turn off those `klyng` beacons by remoting into each minion and `gru` to run the following.  Remember that `gru` didn't run the command as `sudo` for what it's worth.

```
$ sudo klyng --beacon-down
```

## Next step, shutting down
Next, continue with the **demo/02-poweroff/README.md** step-by-step instructions from here.
