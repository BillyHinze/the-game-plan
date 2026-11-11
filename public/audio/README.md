# Your own narration
Upload a real MP3 named **voiceover.mp3** into this folder. No dummy MP3 is included. Silent exports work without it.

GitHub: open this folder → Add file → Upload files → choose your recording → Commit changes.

Record the supplied script in 120–180 seconds. The renderer measures the file on the cloud runner, plays it from frame zero and proportionally stretches the scene schedule to fit. It never generates a voice, speeds up your recording or silently truncates it.

For exact scene cues, optionally create **timing.json** in this folder using GitHub's Create new file button. Enter an array of 11 second values: scene 1 start (0), scene 2 start, … scene 10 start, film end. Example: [0,9,13,35,49,57,68,82,90,106,130]. The last value must be 120–180 and at least the audio duration. This is scene-level timing, not automatic speech recognition. Captions use estimated word timing within each scene; review them against your recording.
