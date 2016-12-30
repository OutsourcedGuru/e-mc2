# Step-by-step Instructions for Setting Up Gru
![gru](https://cloud.githubusercontent.com/assets/15971213/21464555/71237744-c935-11e6-81e4-c130725f2f0e.jpg)

Since `gru` is the server node, you'd think that it would need to be setup first but that's not the case here.  First, setup the `dave` node following the  **/minions/01-dave/README.md** instructions up to the step where you've copied the first image to your computer's hard drive.  Assuming that you've done this already and have an image file named `dave.dmg`, please proceed now with the setup of `gru`.

## Setup a common USB-based thumbdrive
We'll need a commonly-shared drive which `gru` will serve up with SMB (Samba).  As the coder, you'll also connect to this drive remotely to push code.

> From a power standpoint, the USB-based charging station can't provide enough current in the USB cable for both a Pi and an external-type USB hard drive enclosure.  This needs to be a thumbdrive style of storage device, in other words.  As for storage size, it doesn't need to be more than 1GB in most cases.

Insert a USB-based thumbdrive into your workstation and format it using the `MS-DOS (FAT)` partitioning type and the `GUID Partitiona Map` scheme, giving it the volume name `USB` and otherwise accepting the defaults, ejecting it when you are finished.

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

Using the same Raspberry Pi 3 from before, put this micro-SD into it, add a monitor/keyboard/mouse and power it as before.

## First boot to Gru (er, Dave)
Boot up the Pi with the imaged micro-SD, noting that since you cloned a `dave` image, it will think its name is `dave`.  Don't worry, we'll fix that.  Connect your workstation remotely into this new setup to change its name.

```
$ ssh pi@dave.local
# Rename dave->gru
$ sudo curl -o /etc/hostname https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/etc/hostname
$ sudo /etc/init.d/hostname.sh start
$ sudo curl -o /etc/hosts https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/etc/hosts
$ sudo curl -o /etc/network/interfaces https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/etc/network/interfaces
$ sudo reboot
$ ssh-keygen -R dave.local
$ ssh-keygen -R 10.20.30.59	# Or whatever your dave's IP address was from before
# Optionally, if ssh complains in the next step, remove any lines in known_hosts related to gru
$ nano ~/.ssh/known_hosts
```
## Second boot to Gru
It should have rebooted by now, so remote back in (this time using its new name).

```
$ ssh pi@gru.local
$ sudo poweroff
```

## Time for a test-fit
Now that we've got `gru` and one minion (`dave`), let's start to put things into place using more of the hardware.

### Put Gru into place

1. Insert the USB drive from earlier into `gru` along with an Ethernet cable (connecting it to the Ethernet switch) and finally a micro-USB cable for power (connecting it to the USB hub).
	2. Connect the power cable from the Ethernet switch to the USB hub as well.
	3. Connect the power cord to the USB hub so that power is now applied to both the Ethernet switch as well as the `gru` computer at the same time.
4. Connect your own workstations's Ethernet connection via a cable to this same Ethernet switch and configure its adapter manually using `10.1.1.254` as the IP address, `255.255.255.0` as the netmask and no router.
5. Verify connectivity to `gru` by trying to ping it with `ping 10.1.1.1`
6. If successful, edit your own computer's **/etc/hosts** file to include `gru-eth` and `dave-eth`, for example, with the appropriate `10.1.1.n` address. Again, verify that you can now ping it with `ping gru-eth`
7. Use the **ssh** or **putty** command to connect, for example, `ssh pi@gru-eth`.
	8. If successful, find out if `gru` connected to the wi-fi network with `ifconfig`, noting the IP address which it received from your router under the section `wlan0`
	9. Verify that `gru` now has a mounted USB drive by entering `sudo ls /media/pi` which should include a `USB` subfolder

### Install an SMB (Samba) share on Gru
Here, we'll setup the server side of SMB to share a common area `gru/share` with both the coder and the minions.

```
$ sudo apt-get install samba samba-common-bin
# Use Minions as the password next...
$ sudo smbpasswd -a pi
$ sudo mkdir /media/pi/USB/share
$ sudo chmod -R 777 /media/pi/USB/share
$ sudo chown -R pi:pi /media/pi/USB/share
$ sudo curl -o /etc/samba/smb.conf https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/etc/samba/smb.conf
$ sudo reboot
```

### Now test connecting a client to the share
From your own workstation, try to map a drive to the share.

```
# OS X
smb://gru-eth.local/share
  User: minions
  Password: Minions
# Windows
\\gru-eth\share
```

## Now Return to Dave's Setup
You'll want to leave `gru` running in the system you've setup earlier.  The next step is to plug an Ethernet adapter, the original micro-SD and a USB power cable for `dave` and continue with the **minions/01-dave/README.md** installation file where you last left off.