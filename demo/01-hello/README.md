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

## Ignore, for the moment
**Unfortunately, it looks like `klyng` has some problems with the current version.**

1. The author edited the files in Microsoft Windows, so there are superfluous CR characters at the end of lines, causing it to not work directly on Linux without a modification
2. There also appears to be a problem thrown regarding a raised exception which isn't being handled.

I'm looking into these problems but for the moment, ignore the rest of this file.
&nbsp;
---
ignore * ignore * ignore * ignore
---

&nbsp;
&nbsp;
&nbsp;
&nbsp;
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
$ cd /media/pi/USB/share
$ mkdir 01-hello
$ cd 01-hello
$ npm init
   name: hello
   version: 1.0.0
   description: The ubiquitous Hello, World! program,    rendered for supercomputers.
   entry point: hello.js
   test command:
   keywords: 
   author: Outsourced Guru
   license: MIT
$ sudo npm install klyng --save
-------
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
$ curl -o hello.js https://...
```
