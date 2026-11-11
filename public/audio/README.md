# Your own narration
Upload a real MP3 named **voiceover.mp3** into this folder. Exports without a narrator still include the original Foley and quiet music.

GitHub: open this folder → Add file → Upload files → choose your recording → Commit changes. Then open Actions → Render The Game Plan → Run workflow → voiceover=yes.

Record the supplied script in 120–180 seconds. The cloud renderer measures the file and scales the scene schedule to fit. It does not generate a voice, accelerate your recording or cut it off.

For precise paragraph cues, optionally create **timing.json** here using GitHub's Create new file button. Enter 11 increasing second values: the ten paragraph starts, then film end. The default is:
[0,10,14,38,54,61,73,89,96,114,130]

The last value must be 120–180 and at least the audio duration. This is paragraph timing, not speech recognition. Caption word timing is estimated; review it against your take. Choose captions=false to export without captions.
