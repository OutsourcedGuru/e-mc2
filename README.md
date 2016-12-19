# e=mc2
An **Expandable Minion Cube Cluster** is a modular supercomputer squad of **Raspberry Pi 3** single-board computers, sometimes called a "bramble".  The intent would be to extend additional **E=MC<sup>2</sup>**'s by adding more and ganging them together via an external Ethernet switch.

This open-source project includes the hardware specifications, price list, software and eventually, the 3D printing files for the container to hold the project in its entirety.

### Parts
The minimum list of hardware for the project is in the **HARDWARE.md** file itself.  Note that during the setup period you may also find it useful to have the following:

* USB-based keyboard
* USB-based mouse
* HDMI-to-DVI cable
* Monitor which accepts DVI input
* Standard 5V Raspberry Pi power adapter
* USB-based adapter which accepts either a micro-SD or an SD card, noting that each micro-SD purchased comes with an SD adapter

### Software
The github repository will hold the differences required for each computer so that the entire system can work together.  Each computer is based upon the Raspbian operating system.  The [NOOBS](https://www.raspberrypi.org/documentation/installation/noobs.md) software will make the installation of Raspian easier but in this case, it needs to be initially installed on each micro-SD adapter.

You may find it simpler to purchase the pre-installed NOOBS micro-SD cards directly, saving a step per computer during the setup.

### Computer Names
Here is a partial list of the first four computers in your system.  The first listed below is considered to be the **villian** (normally referred to as the "master") and the remainder are the **minions** (normally referred to as the "slaves").

1. gru
2. dave
3. kevin
4. bob

### Instructions

Start with the **minions/00-all/README.md** instructions for the first `dave` minion so that you can create a local image suitable for cloning.

Next, use the **gru/README.md** instructions to setup the `gru` computer and to test **ssh** connectivity to it.  You would also test connectivity to the `PiShare` share so that you can copy your own [MPI](https://en.wikipedia.org/wiki/Message_Passing_Interface)-based code for the system and to share data resources.  Normally, you'd connect to `gru` via wi-fi.

You'll then clone additional minions from the `dave` image you created earlier, adding them to the system.  Each minion gets an Ethernet cable and a micro-USB cable to power it.  Although each minion connects to your wi-fi network, most system communications occur via the internal Ethernet switch.  (You could technically have the minions *not* connect to wi-fi however this is useful for later updating all the computers.)

Finally, you would upload code to the `PiShare`, **ssh** to `gru` via wi-fi, change to the shared folder and then initiate a program in parallel, (directing all three minions to do the work), by entering a command like `mpiexec -f minionlistfile -n 3 ./mpi-helloworld`.  This would then choose three available minions from the list and direct them to also run the same program.  The `gru` computer would receive the results of the work and display it on its terminal session.

### Audio
Since this is a minion-themed project, I intend to add sound events for the dispatching and acknowledgement of work by playing WAV files from the "Despicable Me" movies.  The `gru` computer then would be connected to a speaker and play these events.