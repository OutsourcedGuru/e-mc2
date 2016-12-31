# Step-by-step Instructions for Setting Up Dave
![dave](https://cloud.githubusercontent.com/assets/15971213/21464217/731ae6ea-c92b-11e6-92d5-365af1d4d060.png)

Since `dave` is the first minion node, it makes sense to begin the software setup here. If you've read the overview then you'll know that this node's micro-SD card will get imaged onto your workstation's hard drive and will be cloned later for the other computers.

So ultimately, those other computers can be setup much more quickly. And yet, you'll find that there will be some special steps for `dave` which won't be necessary after this part of the installation.

### Assumptions
I assume that you *didn't* buy the slightly more expensive micro-SD card with the Raspberry logo on its SD card adapter. *That* version comes pre-loaded with the NOOBS installation software.

Now of course, you could simply purchase one of those plus three standard micro-SD cards for the other three computers (remembering that you'll be cloning from your initial image anyway so you'll end up with NOOBS on all of them).  Feel free to take that route if you'd like, but you'll want to skip the section coming up where you then format and install NOOBS itself.

## Start with your own computer
For this part, you'll want to use a workstation like a Mac or a PC or UNIX computer. Minimally, you'd either need one of the two following setups:

1. a slot which accepts an SD adapter or the smaller micro-SD card
2. a USB slot plus an external USB adapter which accepts either SD or micro-SD cards, for example:

![fr-789217194527](https://cloud.githubusercontent.com/assets/15971213/21373352/21a5c8ac-c6d3-11e6-9de7-462eccc294e2.jpg)

Note that the specified Toshiba micro-SD card in the HARDWARE.md file already includes an SD adapter for the micro-SD card itself. Some popular computers like Dell workstations actually have media slots for SD adapters, for example.

![ts-4047999330332](https://cloud.githubusercontent.com/assets/15971213/21297610/e74e9266-c537-11e6-8979-0ecf5752736f.jpg)

It would be good to next put the micro-SD card into either the SD adapter it came with or directly into a purchased USB-based adapter otherwise and then into your workstation. Hopefully a driver will load if necessary and you can then see the new drive. You should test to see if you can write a file to this drive to verify that the software driver can do so. If not, you might try something else instead because the next part requires that you can write to the drive as well as read from it.

It's probably also a good idea to verify that your computer has at least 2GB of free space since this is twice the size of the zip file itself.

### Optionally, download NOOBS.zip

The RaspberryPi.org website includes a page with the instructions and the [link to download NOOBS.zip](https://www.raspberrypi.org/downloads/noobs/). You should choose the standard version rather than the **Lite** option.

Once downloaded, it is unnecessary at this time to unzip this file.  On a Mac, however, it will automatically unzip into a folder under `Downloads` so this is okay.

### Optionally, download SDFormatter
The OS X operating system has a **Disc Utility** program which allows you to easily format the micro-SD card using the `MS-DOS` format type and choosing to install a **Master Boot Record**. Just remember to name the volume `dave` for this one.

For Microsoft Windows, download the [SDFormatter setup program](https://www.sdcard.org/downloads/formatter_4/) and run that, making sure to select the drive letter associated with your micro-SD card. I've highlighted the important options to choose.

![microsd-cardformatting](https://cloud.githubusercontent.com/assets/15971213/21371007/b8ab9570-c6c3-11e6-9a47-9d9cd6967626.png)

I've had the most success doing the OS X version of this, btw.  If you have that as an option, do it and save yourself the hassle.

### Expand NOOBS.zip straight to the micro-SD card
Here, I'm assuming that you're using the popular 7-Zip program but it's a similar process to WinZip, for example. You want to find the NOOBS.zip file you downloaded earlier and expand it directly into the root of your newly-formatted micro-SD card.

![microsd-unzippingnoobs](https://cloud.githubusercontent.com/assets/15971213/21371053/f1eab190-c6c3-11e6-8192-2047e12d0b8c.png)

![microsd-unzippingnoobs-2](https://cloud.githubusercontent.com/assets/15971213/21371070/06570278-c6c4-11e6-9902-baae3b38ecc0.png)

> On a Mac, the zip file will automatically be unzipped into a folder under `Downloads`.  Just highlight everything under this folder and copy it into the root of the micro-SD drive.

When this process has completed, make sure that you properly **Eject** the drive associated with the micro-SD card.

> If you get errors unzipping files to your micro-SD card, it may be necessary to **Eject** the card and put it into a different slot on your computer.  For example, your USB-based adapter may only support USB 2.0 and you've inserted into a USB 3.0 slot (or vice versa).

And in some cases, it may be necessary to first unzip the files and then move them over a few at a time.

## Now, let's use dave
Next, we'll need to make some connections for our first minion whose name is `dave` in your system. If you've not already done so, unbox a **Raspberry Pi 3**.

### Parts list
Check to see if you have the following available before continuing:

1. One **Raspberry Pi 3** (Model B, 1GB RAM)
2. One 5V micro-USB power adapter
3. A USB-based keyboard
4. A USB-based mouse
5. An existing wi-fi network and you should know the name (SSID) and the password to connect to it
6. An existing Ethernet hub, say, on your wi-fi router or your cable modem itself
7. An Ethernet cable long enough to get from that hub to your **Raspberry Pi 3**
8. An HDMI-to-DVI or HDMI-to-VGA cable
9. A monitor which accepts either DVI or VGA, depending upon that cable type
8. The first micro-SD card labeled `dave` that you just setup

If you have all these things then here are the connections to be made.

1. Remove the micro-SD card from the SD adapter and install it on the underside of the **Raspberry Pi 3** on the end opposite the USB connections.
2. Plug in the USB keyboard and mouse
3. Plug in your HDMI cable and connect that to your monitor, turning the monitor ON
4. Plug the Ethernet cable into your **Raspberry Pi 3** and into your Ethernet hub
5. Plug the power adapter into an outlet and into the Pi's micro-USB slot on the side to power it ON for the first time

## Your first boot to the NOOBS installer
As `dave` boots up, you should see status on your monitor to include a Raspberry logo.

> If you see the message *"Waiting for SD card (settings partition)"* and it doesn't seem to go away, then you've probably set the wrong format type for your micro-SD card and you might have to start over.  But first, try unplugging the power adapter, reseating the micro-SD and try again to be sure.

You should now see the **"NOOBS v2.1 - Built: Nov 24 2016"** or similar menu.  At the bottom of the screen first select the correct language and keyboard, then in the list above check the box next to the **Raspbian** option.  Select the menu button at the top for **Wifi networks**.  Select your own wi-fi zone and enter in your password to join, selecting `OK`.  Finally, select the `Install` button at the top.

The interface will warn you that the card will be overwritten.  Confirm by clicking the `Yes` button.

For my own Raspbian install, it took about 30 minutes to re-partition, re-size and then to extract the filesystem to the new boot partition, about 3.5GB in total.  Note that it will shrink the existing NOOBS-installed partition down to its minimum size and rename it to **Recovery**, making it available later if you hold the `Shift` key during a bootup.

You'll now be informed that your "OS(es) Installed Successfully" and you'll need to click the `OK` button to reboot.

## Your second boot into Raspbian
Things start to get exciting by this point.

The underlying Raspbian operating system is built upon Debian, a popular open-sourced system.  It is a full desktop environment plus the familiar terminal of course.  It includes at least one web browser and office applications.

During this first Raspbian boot, the installer makes some assumptions since you'll probably want to be issued IP addresses on the Ethernet adapter but it won't yet have your wi-fi information yet.

Out-of-the-box, there are some things that have been preset for you but we'll need to change some of them.  Here, I assume a new common user/password throughout which is different than the default.  If you decide to change these to something unique then please translate to your own values as you continue with the remaining documentation.

<table>
	<tr>
		<td colspan="2" align="center" bgcolor="#eeeeee">Original Values</td>
	</tr>
	<tr>
		<td align="center" bgcolor="#eeeeee">Variable</td>
		<td align="center" bgcolor="#eeeeee">Value</td>
	</tr>
	<tr>
		<td>Hostname:</td>
		<td>raspberrypi</td>
	</tr>
	<tr>
		<td>Username:</td>
		<td>pi</td>
	</tr>
	<tr>
		<td>Password:</td>
		<td>raspberry</td>
	</tr>
	<tr>
		<td colspan="2" align="center" bgcolor="#eeeeee">Our New Ones</td>
	</tr>
	<tr>
		<td align="center" bgcolor="#eeeeee">Variable</td>
		<td align="center" bgcolor="#eeeeee">Value</td>
	</tr>
	<tr>
		<td>Hostname:</td>
		<td>dave</td>
	</tr>
	<tr>
		<td>Username:</td>
		<td>pi</td>
	</tr>
	<tr>
		<td>Password:</td>
		<td>Minions</td>
	</tr>
</table>

This can be a bit tricky, but follow along and you should be fine.

## Your third boot into Raspbian
We now want to remove the Ethernet adapter out of the picture and verify that we can talk to the computer with only wi-fi.

From the **Raspberry** nenu, choose `Shutdown...`, `Shutdown`.  Disconnect the Ethernet.  Unplug and then re-plug the power adapter connection.

Again, it should boot back into the system automatically.  Hover over the top status bar ("LX Panel") item that looks like two sliders with two red x's.  It should indicate that "wlan0 is not associated" which is to be expected.

### Enter wi-fi credentials

Left-mouse click this same icon, select your own wi-fi zone and type in your zone's password and click `OK`.  


### Note your wi-fi adapter's IP address
Again, however over the same item in the panel and find the IP address next to wlan0.  Mine indicates `10.20.30.59`/24 but yours will be different.  In most cases, ignore the part that begins with the slash and take note of this number.

### Update the hostname, turn on SSH and set other configuration options

From the **Raspberry** menu -> **Preferences** -> **Raspberry Pi Configuration** menu area, make the following changes.

<table>
	<tr>
		<td align="center" bgcolor="#eeeeee">Tab</td>
		<td align="center" bgcolor="#eeeeee">Variable</td>
		<td align="center" bgcolor="#eeeeee">Value</td
	</tr>
	<tr>
		<td rowspan="3">System</td>
		<td>Hostname:</td>
		<td>dave</td>
	</tr>
	<tr>
		<td>Password:</td>
		<td>Minions</td>
	</tr>
	<tr>
		<td>Filesystem:</td>
		<td>Expand Filesystem<sup>1</sup></td>
	</tr>
	<tr>
		<td>Interfaces</td>
		<td>SSH:</td>
		<td>Enabled</td>
	</tr>
	<tr>
		<td rowspan="3">Localisation</td>
		<td>Locale:</td>
		<td>Set country to yours</td>
	</tr>
	<tr>
		<td>Timezone:</td>
		<td>Set your country and timezone</td>
	</tr>
	<tr>
		<td>WiFi Country:</td>
		<td>Set your country</td>
	<tr>
</table>

Note that the original password for the `pi` username was `raspberry`.  Click `OK` and let it reboot.

1. If you didn't purchase the same size for all your micro-SD cards then it's a good idea not to expand this one.  You can always expand each later if you'd like but you can't create an OS 15GB partition image on `dave` and then restore it onto an 8GB card for, say, `kevin`.

## Fourth boot into Raspian
Your Pi should now boot up again.

## Back to your workstation
From your workstation, bring up an MS-DOS prompt or a Terminal window and securely connect to `dave`.

> If you're on Windows and you haven't already done so, download [putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) and make sure that its location is in your PATH environment variable.  You might also need [OpenSSH](https://www.openssh.com) for key management as well.

OS X: `ssh pi@10.20.30.59`

Windows:  `putty pi@10.20.30.59`

Substitute your own Pi's wi-fi adapter IP address which you learned in an earlier step above.

> You should next be told that the authenticity of this computer can't be established and you should then enter `yes` to proceed.

Next, enter the new password `Minions` which you just set in the step before this one.  You should now see a prompt like the following.

`pi@dave:~ $`

Enter `sudo poweroff` to remotely power off the Pi.

## Get dave ready to be headless
Now that `dave` has been gracefully shutdown, remove all cables beginning with the power adapter.

## And that's one last boot for dave, one giant leap for minionkind...
Now plug just the power adapter back into this computer.  Wait about a minute and then attempt to `ssh` back into it from your workstation (noting that this time, we're using its hostname instead).

OS X: `ssh pi@dave.local`

If this succeeds, you should be able to stow away that collection of Ethernet cable, USB keyboard/mouse and video cable for a while since we shouldn't need them for what comes next.

## Update everything in place
From your terminal session, run the following, answering with a `y` response if asked to continue and entering the `Minions` root password for at least the first `sudo` command to get things going (if prompted for a password).

```
$ sudo apt update
$ sudo apt full-upgrade
$ sudo reboot
```

This will take about thirty minutes.  After that reboot, wait about a minute and then connect again remotely to `dave`.

## Install some common software
We have a few things that we would like to do on each minion and on `gru` as well.

* Run Node.js applications
* Communicate via the Message Passing Interace (MPI) calls
* Run Python programs<sup>1</sup>
* Use a common share via SMB

And there will be some things that we usually only do with the `gru` node itself.  (We won't be installing these yet since we're only doing the common image.)

* Play sound events over a speaker
* RDP (Remote Desktop) to the graphical interface
* Run a webserver
* Serve up a shared drive via SMB (Samba) for each minion and the coder [not implemented]

1. Fortunately, Python is pre-installed in the Raspbian filesystem.

### Install Node.js

```
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
$ sudo apt install nodejs
$ sudo apt-get autoremove
$ node -v
```

### Install MPI support
The Message Passing Interface (MPI) allows us to push work from one node to another (or many) in a supercomputer.  We'll be using the `klyng` Node.js module and installing support for it globally.

```
$ mkdir ~/.npm-modules
$ echo export PATH=\~/.npm-modules/bin:\$PATH >> ~/.profile
$ source ~/.profile
$ NPM_CONFIG_PREFIX=/home/pi/.npm-modules sudo npm install -g klyng
```

### Install SMB...?
Unfortunately, this is one of those chicken-and-egg problems.  We want to install the SMB *client* piece on all the nodes except `gru` (server), only we need to clone `gru` initially from `dave`, a minion (client).  It's a bit of a paradox unless we're clever about it.

So, we defer this part of the installation until after we've first cloned this image, created `gru` and then installed SMB with the *server* side on that node.  We then return to `dave`, add the SMB client piece, re-image for the remaining minions and we're now past that hurdle.

## So Far, So Good
We've got `dave` close to being complete from the standpoint of software but we'll need to clone all this first before coming back for the SMB client part.

While we're at it, though, we have some networking to take care of.

## Networking
The wi-fi networking appears to be working but honestly, we won't usually be talking to the minions directly unless we're doing upgrades, say.

This design reasonally hopes to separate the kinds of communications like this:

1. Ethernet for internal communications
2. The wi-fi on `gru` for coder communications

So most of the time, you—as the coder—are the only one really talking to your E=MC<sup>2</sup> over wi-fi which is probably a good thing from the standpoint of security.

> You *could* temporarily turn off the wi-fi with `ifconfig wlan0 down` on each minion (assuming that you're remoting in via the Ethernet side of things).  A downside to this approach is that your nodes can't simply pull updates by themselves from external repositories.  Presumably, this is because there won't be a routing paradigm to allow this to happen.  I could test this theory later, but for now, I'll continue documenting.

### /etc/hosts
In order for internal communications to occur smoothly, we'll be populating the entire list of minions by name and IP address for each node.

Here, we'll use `curl` to pull a `hosts` file directly from github into the **/etc** folder, but first we'll make a copy of the original.

```
$ sudo cp /etc/hosts /etc/hosts.save
$ sudo curl -o /etc/hosts https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/01-dave/etc/hosts
```

### /etc/network/inferfaces
After May 2015, Raspian out-of-the-box appears to be using `dhcpcd` rather than the more familier networking.  I'm sure this is a great system but I find it to be cumbersome, to be honest.  So here, I'm reverting things back to the expected methodology and noting this for you.

Here, we'll pull an `interfaces` file directly from github.

```
$ sudo cp /etc/network/interfaces /etc/network/interfaces.save
$ sudo curl -o /etc/network/interfaces https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/01-dave/etc/network/interfaces
$ sudo cat /etc/network/interfaces
```
> Optionally, edit your `interfaces` file to change the DNS server(s) you might want to use locally.  This should only be necessary if you decide to turn off the wi-fi adapters on each minion.  If you do so, I would suggest uncommenting the line with "gateway" in it and make sure that this represents a valid network router directly attached to the external Ethernet on the E=MC<sup>2</sup>.

Now turn off `dhcpcd` and turn on `networking` and reboot for the changes to take effect.

```
$ sudo systemctl disable dhcpcd
$ sudo systemctl enable networking
$ sudo reboot
```
Connect again to `dave` remotely and check the networking status.

```
$ ifconfig
eth0      Link encap:Ethernet  HWaddr b8:27:eb:5b:11:b6  
          inet addr:10.1.1.2  Bcast:10.1.1.255  Mask:255.255.255.0
          UP BROADCAST MULTICAST  MTU:1500  Metric:1
          ...
```

The Ethernet adapter should have been issued the expected `10.1.1.2` in the second line and be marked as `UP` in the third line even if we haven't connected a cable to it.  So now we know that internal traffic should work out if we attach `gru` and the minions to the internal Ethernet switch.

## It's cloning time
So now, gracefully shutdown `dave` so that we can bring the micro-SD card back to our workstation for creating that image.

```
$ sudo poweroff
```

Unplug the power adapter, remove the micro-SD and return it to your workstation rig from before.

On OS X—assuming that you've connected the micro-SD card to your workstation via USB—here is how to create an image file, assuming that you have a spare 16GB of available space somewhere.

```
$ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *160.0 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                  Apple_HFS MacOS                   99.3 GB    disk0s2
   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3
   4:                  Apple_HFS Recovery HD             650.0 MB   disk0s4
   5:           Linux Filesystem                         53.2 GB    disk0s5
   6:                 Linux Swap                         6.0 GB     disk0s6
/dev/disk1 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.9 GB    disk1
   1:             Windows_FAT_16 RECOVERY                1.2 GB     disk1s1
   2:                      Linux                         33.6 MB    disk1s5
   3:             Windows_FAT_32 boot                    69.2 MB    disk1s6
   4:                      Linux                         14.7 GB    disk1s7
```
### Install ApplePi-Baker
After days of hating my life trying to backup/restore these images, I discovered an awesome application which is many times faster and a lot easier.  If you're on OS X you'll definitely want to install [ApplePi-Baker](http://www.tweaking4all.com/software/macosx-software/macosx-apple-pi-baker/).

Running the software, you then identify your `dave` micro-SD, then click the `Create Backup` button, indicate that you want a `Zip` file format and find a place to store your backup.  My 16GB micro-SD card compressed down to about 3.3GB, for what it's worth, and took less than thirty minutes.  Exit this software and **Eject** the `boot` drive by dragging it to the **Trash**.  Select **Eject All** when prompted.  Physically remove the micro-SD media and put it somewhere so that you'll remember that it's the `dave` card.

## Go to gru/README.md instructions
At this point, we'll put a bookmark in the `dave` setup and begin setting up `gru` and the server side of NFS.  Then we'll return here next and continue the setup for `dave` after we have `gru` as the endpoint for our NFS client side setup.

## Returning from the Gru install
So you've setup `gru` and it's now in the system and powered up.  We now continue with the `dave` setup so that it can connect via SMB to the share we created earlier.

Connect an Ethernet cable to `dave`, re-insert the micro-SD card plug another USB power cable into it on one side and into the USB charging station on the other to power it up.

## Connect again to Dave
If your workstation is still connected via Ethernet cable to the switch then you should be able to connect now to `dave` using the following command.

```
$ ssh pi@dave-eth.local
```

Note that we're using the Ethernet-centric **/etc/hosts** entry that you should have made before during the `gru` setup.  This should test to see if `dave` responds to that `10.1.1.2` IP address.

## Install SMB Client Support
Now that we've connected again to `dave`, we'll want to persistently map to that share that's on `gru`.

```
$ sudo apt-get install cifs-utils
$ sudo mkdir /media/share
$ sudo curl -o ~/.smbcredentials https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/01-dave/.smbcredentials
$ sudo chmod 600 ~/.smbcredentials
$ sudo cp /etc/fstab /etc/fstab.save
$ sudo bash
#   Note that we are now elevated to the root user and
#   I'll use the prompt "root@dave:/home/pi#" and you'll
#   copy/paste everything to the right of that into your
#   terminal.
root@dave:/home/pi# echo //gru/share /media/share cifs credentials=/home/pi/.smbcredentials,iocharset=utf8,sec=ntlm 0 0 >> /etc/fstab
root@dave:/home/pi# exit
$ sudo mount -a
$ ls /media/share
Hello.minions
$ exit
```

## For Now, That's It For Dave
For the other minions `kevin` and `bob`, it's probably the fastest to just clone the original `dave` image, add the `/etc/hostname` and related files, etc, then run the SMB Client Support section above.  If you thought that you had lots more nodes than just two more, it might be easiest then to clone `dave` again and use this as a starting point for the rest.  And yet, each new node will need its own unique `/etc/hostname` and `/etc/hosts` file regardless.

## Next Step, Kevin
Next, continue with the **minions/02-kevin/README.md** step-by-step instructions from here.