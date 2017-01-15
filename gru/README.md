# Step-by-step Instructions for Setting Up Gru
![gru](https://cloud.githubusercontent.com/assets/15971213/21464555/71237744-c935-11e6-81e4-c130725f2f0e.jpg)

Since `gru` is the server node, you'd think that it would need to be setup first but that's not the case here.  First, setup the `dave` node following the  **/minions/01-dave/README.md** instructions up to the step where you've copied the first image to your computer's hard drive.  Assuming that you've done this already and have an image file named `dave.dmg`, please proceed now with the setup of `gru`.

## Install a common USB-based thumbdrive
We'll need a commonly-shared drive which `gru` will serve up with SMB (Samba).  As the coder, you'll also connect to this drive remotely to push code.

> From a power standpoint, the USB-based charging station can't provide enough current in the USB cable for both a Pi and an external-type USB hard drive enclosure.  This needs to be a thumbdrive style of storage device, in other words.  As for storage size, it doesn't need to be more than 1GB in most cases.

Save the USB-based thumbdrive for a later step.

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
$ sudo apt-get install udisks
$ sudo apt-get install eject
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
	9. Verify that `gru` now has a mounted USB drive by entering `sudo ls /media/pi` which should include a subfolder which is the same as the USB's volume name

### Format the USB drive
Before we can use the USB drive we'll need to format it using an `ext4` partitioning type and this isn't easily available on OS X, for example, so we need to do it in place on `gru`.

```
$ df
/dev/root       13648984 3985568   8947028  31% /
devtmpfs          469532       0    469532   0% /dev
tmpfs             473864       0    473864   0% /dev/shm
tmpfs             473864    6432    467432   2% /run
tmpfs               5120       4      5116   1% /run/lock
tmpfs             473864       0    473864   0% /sys/fs/cgroup
/dev/mmcblk0p6     67434   22004     45430  33% /boot
tmpfs              94776       0     94776   0% /run/user/1000
/dev/sda         7609536    1032   7608504   1% /media/pi/USB
/dev/mmcblk0p5     30701     443     27965   2% /media/pi/SETTINGS

#   So here, we see that /dev/sda has been automatically
#   mounted under /media/pi as USB so that's our drive.
#   Yours may be different since your USB probably already
#   came formatted.  It's important to note that it's
#   /dev/sda here and probably the same on your Pi
$ umount /media/pi/USB
```
We need to determine whether or not the USB has been formatted with a DOS/MBR because that will cause problems.  Optionally, then, remove the MBR.

```
$ sudo file -s /dev/sda
/dev/sda: DOS/MBR boot sector; partition 1 : ID=0x5, start-CHS (0x0,33,3), end-CHS (0x3fc,128,56), startsector 2048, 15246784 sectors, extended partition table (last)

#   It does, so remove it
$ sudo dd if=/dev/zero of=/dev/sda bs=512 count=1
```

Now return to the work at hand.

```
$ sudo fdisk /dev/sda
Command (m for help): p
Disk /dev/sda: 7.3 GiB, 7807401984 bytes, 15248832 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

#   In my case, I don't see any partitions.  You'd see
#   these as /dev/sda1, /dev/sda2, etc.  If this is the
#   case, use the d command to delete each one as in 'd 1',
#   for example.

Command (m for help): g
Created a new GPT disklabel (GUID: B43F7209-EDB2-4303-BB5B-5D9CC21507E4).

Command (m for help): n
#   Just press ENTER for each of these to accept the defaults
Partition number (1-128, default 1): 
First sector (2048-15248798, default 2048): 
Last sector, +sectors or +size{K,M,G,T,P} (2048-15248798, default 15248798): 

Created a new partition 1 of type 'Linux filesystem' and of size 7.3 GiB.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

$ sudo fdisk -l /dev/sda
Disk /dev/sda: 7.3 GiB, 7807401984 bytes, 15248832 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device     Boot Start      End  Sectors  Size Id Type
/dev/sda1        2048 15248831 15246784  7.3G  5 Extended

#   So, /dev/sda1 is the partition we're interested in
#   and we're creating a file system with 'usb' as the
#   volume name.
$ sudo mkfs.ext4 /dev/sda1 -L usb
mke2fs 1.42.12 (29-Aug-2014)
Found a dos partition table in /dev/sda1
Proceed anyway? (y,n) y
Creating filesystem with 1905843 4k blocks and 476720 inodes
Filesystem UUID: 0c37e39b-4a15-4ce0-bbbf-adc9fc16eb29
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done 

#   Reboot to be on the safe side
$ sudo reboot

#   Give it a chance to boot up and remote back into gru
$ df
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/root       13648984 4104696   8827900  32% /
devtmpfs          469532       0    469532   0% /dev
tmpfs             473864       0    473864   0% /dev/shm
tmpfs             473864    6604    467260   2% /run
tmpfs               5120       4      5116   1% /run/lock
tmpfs             473864       0    473864   0% /sys/fs/cgroup
/dev/mmcblk0p6     67434   22052     45382  33% /boot
tmpfs              94776       0     94776   0% /run/user/1000
/dev/sda1        7372576   16764   6958260   1% /media/pi/usb
/dev/mmcblk0p5     30701     443     27965   2% /media/pi/SETTINGS

#   So we see that the Pi has auto-mounted the USB drive
#   using its new volume name at /media/pi/usb
```

### Install an SMB (Samba) share on Gru
Here, we'll setup the server side of SMB to share a common area `gru/share` with both the coder and the minions.

```
$ sudo apt-get install samba samba-common-bin
# Use Minions as the password next...
$ sudo smbpasswd -a pi
$ sudo mkdir /media/pi/usb/share
$ sudo curl -o /media/pi/usb/share/Hello.minions https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/Hello.minions
$ sudo chmod -R 777 /media/pi/usb/share
$ sudo chown -R pi:pi /media/pi/usb/share
$ sudo curl -o /etc/samba/smb.conf https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/etc/samba/smb.conf
$ sudo reboot
```

### Now test connecting a client to the share
From your own workstation, try to map a drive to the share.

```
# OS X
smb://gru-eth.local/share
  User: pi
  Password: Minions
# Windows
\\gru-eth\share
```

## Now Return to Dave's Setup
You'll want to leave `gru` running in the system you've setup earlier.  The next step is to plug an Ethernet adapter, the original micro-SD and a USB power cable for `dave` and continue with the **minions/01-dave/README.md** installation file where you last left off.