# The Game Plan — animated portrait film
A 130-second, 1080 × 1920, 30 FPS H.264/AAC film for a Year 10 HPE physical activity plan. Original articulated cartoon characters in dimensional sets, 36 distinct shots, original Foley, quiet original instrumental music, short captions, and room for your own narration.

## Download and record
The delivered MP4 already has sound effects and music, with **no synthetic narrator**. Read `READ-THIS-TO-RECORD.txt` from the video artifact to record your voice. `narration.txt`, `timing.json`, `captions.srt` and separate WAV stems are included.

## Browser-only rendering
1. Open **Actions → Render The Game Plan → Run workflow**.
2. Select **final**, **1080p**, **30** FPS preview setting, and **swangle**.
3. Choose captions on for the finished cut, or off for a clean version to edit.
4. When the run completes, download **THE-GAME-PLAN-v2-1080p** from its Summary.
All installation and rendering occurs on GitHub-hosted runners. Nothing needs installing or running in a local terminal.

## Add your own voice
1. Use GitHub **Add file → Upload files** to place a recording at `public/audio/voiceover.mp3`.
2. Run the workflow with `voiceover=yes`.
3. The recording must be 120–180 seconds. The film scales to its length without speeding up or cutting your audio. For precise paragraph alignment, also upload `public/audio/timing.json`: 11 increasing second values, starting at 0 and ending at the film duration.
Default boundaries: `[0,10,14,38,54,61,73,89,96,114,130]`.
The music and Foley are mixed below your recording. You can instead mix the supplied WAV stems in an editor.

## Editable source
- `src/data/narration.ts`: the supplied 312-word script.
- `src/data/shots.ts`: shot order, sets, timing, on-screen labels.
- `src/components/Puppet.tsx`: original code-drawn character art, expressions, constrained limbs and attached props.
- `src/scenes/FilmStage.tsx`: actions, ball paths, staging and props.
- `src/components/FilmWorld.tsx`: bedroom, hall, adult gym, junior gym, street, beach, rainy bus stop and park.
- `src/components/FilmCamera.tsx`: shot-specific camera movement.
- `scripts/sound.ts`: deterministic original Foley and music synthesis.
- `scripts/qa.ts`: encoded video, audio, freeze/black-frame and repeat-frame checks.

The pipeline renders five consecutive frame ranges on separate GitHub runners and joins them without dropping or duplicating frames. Character poses and all motion derive from absolute frame time, so chunks have no simulation-state discontinuity. The film uses React, TypeScript, Remotion, Three.js and React Three Fiber. Existing reusable 3D stickman modules remain available for other projects.

## Evidence and assessment facts
SportUP Sunshine Coast requires players to be 18+. The junior pathway is Suncoast Clippers until eligibility. Government guidance for ages 5–17 is at least 60 minutes of moderate-to-vigorous activity daily. Current fees and availability should be checked before registration. Official URLs and dated notes are in `src/data/sources.ts` and the recording pack.

## Licensing
All character art, sets and procedural audio in this revision were authored for this project. No reference screenshots, commercial song, sampled Foley or AI-generated still image is used in the finished film. Montserrat is downloaded during the cloud build under its SIL Open Font License; the bundled license is `public/fonts/OFL.txt`.
