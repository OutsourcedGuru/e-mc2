# Installation for gru (master)
The following is an overview of the installation for the gru computer.

1. First, setup the `dave` initial minion computer following the **/minions/00-all/README.md** instructions up to the step where you've copied the first image to your computer's hard drive
2. Insert the USB-based drive into your computer and format it using the FAT partitioning type, giving it the volume name `USB` and otherwise accepting the defaults, ejecting it when you are finished.  This will be a shared file system among all the minions and `gru` and will be available remotely to your computer as well.  Note: This should not be an external USB-based hard drive but a standard USB (SanDisk/Thumbdrive) style of drive.  The USB hub as specified will not power both the Raspberry Pi 3 and an external drive because of limited current.
3. Next, format another micro-SD for the master computer `gru` and copy your image to this card
	4. In-place, edit the **/etc/hostname** file to name it `gru`
	5. In-place, edit the **/etc/hosts** file to name it `gru`
	6. In-place, edit the **/etc/network/interfaces** file to set the IP address to `10.1.1.1`
	7. In-place, add any software from the repository under the **gru** folder (other than this README.md file)
8. Install the `gru` computer
	9. Insert the USB drive from earlier and this micro-SD card you've just created into the `gru` computer along with an Ethernet cable (connecting it to the Ethernet switch) and finally a micro-USB cable for power (connecting it to the USB hub).
	9. Connect the power cable from the Ethernet switch to the USB hub as well.
	10. Connect the power cord to the Ethernet hub so that power is now applied to both the Ethernet switch as well as the `gru` computer.
11. Connect your own computer's Ethernet connection via a cable to the Ethernet switch and configure its ethernet adapter manually using `10.1.1.254` as the IP address.
12. Verify connectivity to `gru` by trying to ping it with `ping 10.1.1.1`
13. If successful, edit your own computer's **/etc/hosts** file to include gru and dave, for example. Again, verify that you can now ping it with `ping gru`
14. Use the **ssh** or **putty** command to connect, for example, `ssh pi@gru`, entering `raspberry` as the default password.
	15. If successful, find out if `gru` succeeded in connecting to the wi-fi network with `ifconfig`, noting the IP address which it received from your router under the section `wlan0`
	16. Optionally, edit your own computer's **/etc/hosts** file to include another entry like `gru-wifi` with this new IP address.  Optionally, exit from your **ssh** session, reset your own Ethernet adapter's configuration back to its original and disconnect the cable from your own computer, finally re-connecting via `ssh pi@gru-wifi` this time.
	17. Verify that `gru` now has a mounted USB drive by entering `sudo ls /mount/pi` which should include a `USB` subfolder
		18. If successful, run `sudo apt-get samba`
		19. Edit the **/etc/samba/smb.conf** file so that this `/mount/pi/USB` folder is shared as `PiShare`
		20. Create a Linux user and issue it a password
		21. Create an SMB user and issue it a password
		20. From your own computer, try to connect to the `smb:gru-wifi\PiShare` share (OS X) or `\\gru-wifi\PiShare` share (Windows), using the SMB user/password combination you created above
		21. This share will be available to all the minions and `gru` (obviously) and will be the method of running the same MPI-based code on the system as well as sharing any common data resources.