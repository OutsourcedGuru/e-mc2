# Remote Minion Shutdown
There may be times when you want to remotely shutdown all the minions.

## Install sshpass
In order to run remote commands with `ssh` and include the password in the command line, you can install `sshpass` and include it inline.

```
$ sudo apt-get install sshpass
```

## Remotely shutdown Bob
Here's how you would shutdown a single minion.

```
$ sshpass -p 'Minions' ssh pi@bob 'sudo poweroff'
```
## Remotely shutdown all minions
Here's how you would shutdown all the minions together.

```
$ sshpass -p 'Minions' ssh pi@dave 'sudo poweroff'
$ sshpass -p 'Minions' ssh pi@kevin 'sudo poweroff'
$ sshpass -p 'Minions' ssh pi@bob 'sudo poweroff'
```

(I tried using an inline `bash` script `for` command but that didn't seem to work out.)

## Next step, audio
Next, continue with the **gru/audio/README.md** step-by-step instructions from here.
