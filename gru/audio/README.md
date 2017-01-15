# Setting Up Sound Events
Fortunately for us, Raspbian comes pre-equipped with audio support called **alsa-utils**.  Just plug an 1/8" stereo (or mono) plug into `gru` and you're halfway there.

## Test that theory first
If you'd like to test sound functionality with `gru` after plugging in a (small) speaker, run the following command from your terminal session.

```
$ speaker-test -c 1 -t wav -l 1 -w Front_Left.wav
```

* **speaker-test**: one of the programs in the alsa-utils module
* **-c 1**: number of channels (speakers), so set it to one since I have a mono speaker
* **-t wav**: select the WAV file input
* **-l 1**: play it once and stop
* **-w Front_Left.wav**: since the default directory is `/usr/share/sounds/alsa`, play the indicated file from there

## Adjust the main volume
There's another good utility in the **alsa-utils** group, `alsamixer` which appears to be how you adjust the volume level.

```
$ alsamixer
```

Note the existing volume level in **dB gain** and then use your up/down cursor keys to adjust.  Press the `ESC` key when you're done.

## Play a WAV file directly
The **alsa-utils** collection has another useful program called `aplay` which we'll use next.

It's important to match the number of channels (stereo versus mono) of the WAV file to the output device.  Note that if you want to introduce audio files, you'll need to match them for your system.

Remote into `gru` and make sure that your speaker is attached.

```
$ mkdir ~/audio
$ sudo curl -o ~/audio/minions-assemble.wav https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/audio/minions-assemble.wav
$ sudo curl -o ~/audio/gru-okay-bedtime.wav https://raw.githubusercontent.com/OutsourcedGuru/e-mc2/master/gru/audio/gru-okay-bedtime.wav
$ aplay ~/audio/minions-assemble.wav
$ aplay ~/audio/gru-okay-bedtime.wav
```

## How I recorded these
For those interested, here's how I recorded these sound files on OS X.

1. **System Preferences** -> **Sound** -> **Input** -> **Input Volume** set to approximately 90%
2. using the **Safari** browser playing a standard Youtube video at the same time running **QuickTime Player** -> **File** -> **New Audio Recording**
3. in **QuickTime**, **File** -> **Export** -> **Audio Only** -> `file.m4a`
4. in **iTunes**, **File** -> **Add to Library** -> select the file, then
5. **Preferences** -> **General** -> **Import Settings** -> **Import Using** = `WAV Encoder` and **Setting** = `Custom` -> **Channels** = `Mono`, `OK`, `OK`, `OK`
6. find the file in the playlist and choose **File** -> **Convert** -> **Create WAV Version**, then
7. find the next file in the playlist with the same name, Ctl-Click it and choose **Show in Finder**

After recording a few files, you'll probably want to set your preferences in both iTunes and in System Preferences back to their original settings.

## Next step, website
The website that's installed on `gru` will automatically play these sound events if you install them here and if the speaker is plugged in when it is powered on.

Next, continue with the **gru/website/README.md** step-by-step instructions from here.
