# Step-by-step Instructions for Setting Up Kevin
![kevin](https://cloud.githubusercontent.com/assets/15971213/21464562/7a29ff84-c935-11e6-9bba-9f23c549e594.png)

If you haven't already done so, follow the instructions for setting up `dave` in the **/minions/01-dave/README.md** step-by-step instructions.  Assuming that you've done this already you'll have an image file named `dave.dmg`.

## Setup another micro-SD card
As before, insert another micro-SD card into your workstation.

As before, open up the **ApplePi-Baker** application.  First select the micro-SD card in the Pi-Crust section.  Find the image file you created before, leaving the check in the box next to **Auto eject after successful restore**.  Select the `Restore Backup` button.  This took about twenty-five minutes to restore the `dave.zip` image to the micro-SD in my case.

### First, let's turn off Dave
Given that you'll be bringing up `kevin` in a few moments but he thinks he's `dave` (temporarily), it's a good idea to gracefully shutdown `dave` with:

```
$ sudo poweroff
```

Unbox a new **Raspberry Pi 3**, put this micro-SD into it and power it using the new system you've created.

## First boot to Kevin (er, Dave)
Boot up the Pi with the imaged micro-SD, noting that since you cloned a `dave` image, it will think its name is `dave`.  Don't worry, we'll fix that.  Connect your workstation remotely into this new setup to change its name.

```
$ ssh pi@dave.local
# Rename dave->kevin
$ sudo curl -o /etc/hostname https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/02-kevin/etc/hostname
$ sudo /etc/init.d/hostname.sh start
$ sudo curl -o /etc/hosts https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/02-kevin/etc/hosts
$ sudo curl -o /etc/network/interfaces https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/02-kevin/etc/network/interfaces
$ sudo reboot
# Optionally, if ssh complains in the next step, remove any lines in known_hosts related to gru
$ nano ~/.ssh/known_hosts
```

## Second boot to Kevin
It should have rebooted by now, so remote back in (this time using its new name).

```
$ ssh pi@kevin.local
```

## Install SMB Client Support
Now that we've connected again to `kevin`, we'll want to persistently map to that share that's on `gru`.  Note that since the SMB credentials don't change from minion to minion, we're just re-using those from `dave` in that step below.

```
$ sudo apt-get install cifs-utils
$ sudo mkdir /media/share
$ sudo curl -o ~/.smbcredentials https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/minions/01-dave/.smbcredentials
$ sudo chmod 600 ~/.smbcredentials
$ sudo cp /etc/fstab /etc/fstab.save
$ sudo bash
#   Note that we are now elevated to the root user and
#   I'll use the prompt "root@kevin:/home/pi#" and you'll
#   copy/paste everything to the right of that into your
#   terminal.
root@kevin:/home/pi# echo //gru/share /media/share cifs credentials=/home/pi/.smbcredentials,iocharset=utf8,sec=ntlm 0 0 >> /etc/fstab
root@kevin:/home/pi# exit
$ sudo mount -a
$ ls /media/share
Hello.minions
$ exit
```

## For Now, That's It For Kevin
It's getting easier since we cloned that original image.

## Next Step, Bob
Next, continue with the **minions/03-bob/README.md** step-by-step instructions from here.