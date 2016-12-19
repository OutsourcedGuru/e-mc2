# Installation for all minions
The following is an overview of the installation for all minion computers.

1. In a computer/workstation, **setup the first micro-SD minion card** using a USB-based adapter
	2. Format the micro-SD card per the [online instructions](https://www.raspberrypi.org/documentation/installation/noobs.md)
	3. Download and install the full NOOBS installation software onto the micro-SD card
	4. Connect a monitor/keyboard/mouse and Ethernet cable to the first Raspberry Pi 3 and insert the initial micro-SD card into it
	5. Connect power to the Raspberry Pi 3, boot it
	6. Choose to install Raspbian from the menu
	7. After the boot, make sure to expand the operating system to the full size of the card
	8. Name this computer `dave`, set its IP configuration manually and let it reboot when finished
	8. Edit the **/etc/network/interfaces** file to manually issue an IP address of `10.1.1.2` to the eth01 adapter and to automatically load the wi-fi connection with `auto wlan0`
	9. Edit the **/etc/wpa_supplicant/wpa_supplicant.conf** file and add the information for your wi-fi network `network={
ssid="YOUR_NETWORK_NAME"
psk="YOUR_NETWORK_PASSWORD"
proto=RSN
key_mgmt=WPA-PSK
pairwise=CCMP
auth_alg=OPEN
}`
	8. Update/upgrade the operating system with `sudo apt-get update` and `sudo apt-get upgrade` and finally a `sudo do-release-upgrade`
	9. Update the **/etc/hosts** file with the name of all computers in the system
	10. Install any software from the repository under the **00-all** folder
	11. Set the timezone
	10. Shutdown the Raspberry Pi 3 computer
7. Remove the micro-SD adapter from the Raspberry Pi 3 and—using your USB-based adapter—**re-insert it back into your computer/workstation for cloning**
	8. 	Create a folder and copy all the folders/files from this micro-SD into that folder and when finished, replace this micro-SD back into the "dave" computer
9. For the next minion "kevin", now all you have to do is:
	10. Format another micro-SD card
	11. Copy your image from the folder you just created
	12. In-place, modify the **/etc/hostname** file to name this computer `kevin`, for example
	13. In-place, modify the /etc/hosts file at the top to name this computer `kevin`, for example
	14. In-place, modify the **/etc/network/interfaces** file to issue an IP address of `10.1.1.3`, for example
	15. The micro-SD card should now be ready for the second minion computer in the system

