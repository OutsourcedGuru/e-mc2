# e=mc2
![gru-and-minions](https://cloud.githubusercontent.com/assets/15971213/21572675/a89f9b02-ce90-11e6-8bd3-a8a401a138c0.jpg)

An **Expandable Minion Cube Cluster** is a modular supercomputer squad of **Raspberry Pi 3** single-board computers, sometimes called a "bramble".  The intent would be to extend additional **E=MC<sup>2</sup>**'s by adding more and ganging them together via an external Ethernet switch.

![e-mc2](https://cloud.githubusercontent.com/assets/15971213/21573476/a4d8f834-ce99-11e6-9f22-037fb59d4d8b.png)

This open-source project includes the hardware specifications, price list, software and eventually, the 3D printing files for the container to hold the project in its entirety.

## Parts
The minimum list of hardware for the project is in the **HARDWARE.md** file itself.  Note that during the setup period you may also find it useful to have the following parts which are *not* actually consumed during the project build itself:

* USB-based keyboard
* USB-based mouse
* HDMI-to-DVI cable
* Monitor which accepts DVI input
* Standard 5V Raspberry Pi power adapter
* USB-based adapter which accepts either a micro-SD or an SD card, noting that each micro-SD purchased comes with an SD adapter

## Software
The github repository will hold the differences required for each computer so that the entire system can work together.  Each computer is based upon the **Raspbian** operating system.  The [NOOBS](https://www.raspberrypi.org/documentation/installation/noobs.md) software will make the installation of the operating system easier but in this case, it needs to be initially installed on the first micro-SD adapter.

You may find it simpler to purchase *a single* pre-installed NOOBS micro-SD card directly, saving a step during the setup.

Note that the bulk of the code you'll be working with from a supercomputer processing standpoint is **JavaScript**.

## Computer Names
Here is a partial list of the first four computers in your system.  The first listed below is considered to be the **villian** (normally referred to as the "master") and the remainder are the **minions** (normally referred to as the "slaves").

1. gru
2. dave
3. kevin
4. bob

## Instructions Overview

Start with the **minions/01-dave/README.md** step-by-step instructions for the first `dave` minion so that you can create a local image suitable for cloning.

Next, use the **gru/README.md** step-by-step instructions to setup the `gru` computer and to test **ssh** connectivity to it.  You would also test connectivity to the `gru\share` share so that you can copy your own [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface)-based code for the system and to share data resources.  Normally, you'd connect to `gru` via wi-fi.

You'll then clone additional minions from the `dave` image you created earlier, adding them to the system.  Each minion gets an Ethernet cable and a micro-USB cable to power it.  Although each minion connects to your wi-fi network, most system communications occur via the internal Ethernet switch.  (You could technically have the minions *not* connect to wi-fi however this is useful for later updating all the computers.)

Finally, you would upload code to the `gru\share`, **ssh** to `gru` via wi-fi, change to the shared folder and then initiate a program in parallel, (directing all three minions to do the work), by entering a command like `klyng -n 16 hello.js -m minionlistfile`.  This would then choose all available minions from the list and direct them to also run sixteen instances of the same program.  The `gru` computer would receive the results of the work and display it on its terminal session.

## Website
The design comes with an HTTP-based interface so that you can go to `http://gru:3000` and initiate jobs (future), check the status of minions and to shut them down as a collection.

![website](https://cloud.githubusercontent.com/assets/15971213/21596759/818ee49e-d0f4-11e6-9f9b-2c920954e884.png)

Now that I'm thinking about it, I could probably develop a REST interface to the system via this webserver.

The website work is coming along and the code is now on the repository.

## Audio
Since this is a minion-themed project, I've added some sound events by playing WAV files from the "Despicable Me" movies.  If the `gru` computer is connected to a speaker when it's originally powered on, it will play these events.

## Project Scope
The initial version of the project will be me providing step-by-step instructions for setting all this up from an OS X—based workstation.  I'll be using tools to make this easier like the **ApplePi-Baker** application which does a fine job of cloning micro-SD cards.  I've discovered that cloning a single card would have taken literally hours without software like this.

> If you have a Windows-based workstation then you should read the entire set of documentation first since I have not provided detailed instructions (yet) for this coding platform.  You might then decide to continue or pass based upon your own familiarity with such things.

## Caveat(s)
Seriously, read through the entire set of documentation and the hardware list before even thinking about purchasing anything.  Some of the steps seem pretty easy to follow but in other cases I just suggest an option in which you might *"edit your /etc/hosts"* and I expect that by now you're remembering the tools that we've used in earlier steps to do that.

For the most part, I've added the raw scripts which you would overcopy in-place.  The helpful `curl` command will then pull them from the open-source repository so you won't have to edit ten or twenty files manually nor worry about typos.

I've issued a local/private `10.1.1.0/24` IP range for the nodes internally.  So in this version, that would support up to 63 **e=mc<sup>2</sup>**'s or one `gru` plus 251 minions.  If you intend to build a bigger supercomputer than this using the design then you should adjust the `netmask` from `255.255.255.0` to something else.

The system is decidedly open to make things easy for beginners.  If you're good with Debian (Raspbian) security then feel free to tighten things up if you'd like.  In particular, I'd suggest that on larger systems you wouldn't necessarily want the minions to be connected to wi-fi.  If you do so, however, just make sure that they have a working route to the Internet in case you want to perform upgrades in-place.

You might save time by installing encryption keys to allow you to `ssh` into `gru`, for example, without the need for a password.

With larger systems, you might just want to merge the bottom portion of the project's `/etc/hosts` file into your own workstation's.  If a minion like `bob` is running then it will broadcast its hostname on the network, making it easy for name-resolution.  But if `bob` is down then name lookups will fail.  Editing your own `hosts` file then can make things work faster for you, the coder.

I should be working with [Fab Lab](http://www.fablabsd.org/tools/) in San Diego soon enough to design and 3D print a (probably) clear plastic housing for the cube itself.  At the moment, my collection of parts are sprawled across a table in my apartment but things are looking good for the design so far.

## Real-time Documentation
I'm writing the documentation as I build my own system.  This allows me to precisely remember what I typed in, the ordering of steps and the problems I've overcome in doing so.

I just removed NFS file sharing support since it simply didn't work.  This has been replaced by SMB (via Samba) and so far it's working as expected.  Additionally, I re-designed the power adapter for the system since the earlier version was too fussy, to be honest.

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
