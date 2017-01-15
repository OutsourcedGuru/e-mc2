# Step-by-step Instructions for Setting Up Gru's Lab Website
Here, we're installing a website on `gru` which ought to allow us to do a variety of tasks like determining minion status, for example.

## Prerequisites
You should have setup `dave` and `gru` by now, following the step-by-step instructions in **minions/01-dave/README.md** and **gru/README.md**, respectively.  And they should be assembled in the system, cabled to Ethernet and powered up.  Also, you should have gone through **demo/01-hello/README.md**, **demo/02-poweroff/README.md** and **gru/audio/README.md** before continuing here.

## Installation
The `git clone` is made interesting below since we're only interested in a single subfolder in the repository.

Remote into `gru` as you've been doing all along.

```
$ cd ~
$ git clone https://github.com/OutsourcedGuru/e-mc2.git
$ cd e-mc2
$ git filter-branch --prune-empty --subdirectory-filter gru/website master
$ cd ~
$ mv e-mc2 website
$ cd website
$ npm install
$ DEBUG=website:* npm start
```

## Visit the website just created
Here, you'll now return to your own workstation and go to the link [http://gru:3000](http://gru:3000).

(Depending upon whether or not you're connecting to `gru` with an Ethernet cable, you might also try [http://gru.local:3000](http://gru.local:3000) instead.)

Regardless, you should see something like the following.

![website](https://cloud.githubusercontent.com/assets/15971213/21596759/818ee49e-d0f4-11e6-9f9b-2c920954e884.png)

It's subtle but there are actually some logistics being returned here since the server had to run three PING commands in order to determine how many minions are available.

## About the Website
The website you see was quickly put together with the [Express Generator](https://www.npmjs.com/package/express-generator), npm, Node.js and a screenshot from the movie's early art design blog and a Google Font which is close enough to the movie poster original.  The remaining work will be done in JavaScript mostly.

## Sound events
I've now added themed sound events for the home page and the shutdown page.

## Shutting down
And I've added a minion-shutdown routine which seems to work great.

## A work-in-progress
At the moment, I'm still "mapping out" the client-side `imagemap`, in html terms so there's not much going on yet.

### Next steps
1. I need to decide where on the background map to put various activities
2. I need to continue to "map out" the index page's `imagemap`
3. I need to start working on the REST API for controlling minions, for example
4. It would be great to be able to start the `klyng` beacons on `gru` and the minions from this interface as well as turn them off again