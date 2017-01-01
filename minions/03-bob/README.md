# Step-by-step Instructions for Setting Up Bob
![bob](https://cloud.githubusercontent.com/assets/15971213/21464565/83bb32b6-c935-11e6-9f23-a7065546b5c8.jpg)

If you haven't already done so, follow the instructions for setting up `dave` in the **/minions/01-dave/README.md** step-by-step instructions.  Assuming that you've done this already you'll have an image file named `dave.dmg`.

## Setup another micro-SD card
As before, insert another micro-SD card into your workstation.

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
   0:     FDisk_partition_scheme                        *15.7 GB    disk2
   1:                 DOS_FAT_32 GRU                     15.7 GB    disk2s1
```
As before, open up the **ApplePi-Baker** application.  First select the micro-SD card in the Pi-Crust section.  Find the image file you created before, leaving the check in the box next to **Auto eject after successful restore**.  Select the `Restore Backup` button.  This took about twenty-five minutes to restore the `dave.zip` image to the micro-SD in my case.

### First, let's turn off Dave
Given that you'll be bringing up `kevin` in a few moments but he thinks he's `dave` (temporarily), it's a good idea to gracefully shutdown `dave` with:

```
$ sudo poweroff
```

Unbox a new **Raspberry Pi 3**, put this micro-SD into it and power it using the new system you've created.

## First boot to Bob (er, Dave)
Boot up the Pi with the imaged micro-SD, noting that since you cloned a `dave` image, it will think its name is `dave`.  Don't worry, we'll fix that.  Connect your workstation remotely into this new setup to change its name.

```
$ ssh pi@dave.local
# Rename dave->bob
$ sudo curl -o /etc/hostname https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/03-bob/etc/hostname
$ sudo /etc/init.d/hostname.sh start
$ sudo curl -o /etc/hosts https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/03-bob/etc/hosts
$ sudo curl -o /etc/network/interfaces https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/03-bob/etc/network/interfaces
$ sudo reboot
# Optionally, if ssh complains in the next step, remove any lines in known_hosts related to gru
$ nano ~/.ssh/known_hosts
```

## Second boot to Bob
It should have rebooted by now, so remote back in (this time using its new name).

```
$ ssh pi@bob.local
```

## Install SMB Client Support
Now that we've connected again to `bob`, we'll want to persistently map to that share that's on `gru`.  Note that since the SMB credentials don't change from minion to minion, we're just re-using those from `dave` in that step below.

```
$ sudo apt-get install cifs-utils
$ sudo mkdir /media/share
$ sudo curl -o ~/.smbcredentials https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/01-dave/.smbcredentials
$ sudo chmod 600 ~/.smbcredentials
$ sudo cp /etc/fstab /etc/fstab.save
$ sudo bash
#   Note that we are now elevated to the root user and
#   I'll use the prompt "root@bob:/home/pi#" and you'll
#   copy/paste everything to the right of that into your
#   terminal.
root@bob:/home/pi# echo //gru/share /media/share cifs credentials=/home/pi/.smbcredentials,iocharset=utf8,sec=ntlm 0 0 >> /etc/fstab
root@bob:/home/pi# exit
$ sudo mount -a
$ ls /media/share
Hello.minions
$ exit
```

## For Now, That's It For Bob
It's getting easier since we cloned that original image.

### Don't forget Dave
Since we temporarily turned off `dave` earlier, don't forget to power him back on.

## Next Step, Hello World!
Next, continue with the **demo/01-hello/README.md** step-by-step instructions from here.