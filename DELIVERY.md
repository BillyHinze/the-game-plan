# V2 video and editable source
## Finished film
THE-GAME-PLAN-v2-1080p.mp4 is 2:10 at 1080 × 1920, 30 FPS, with H.264 picture and AAC sound. It contains 37 authored shots, animated characters and props, camera movement, original sound effects and a quiet original instrumental bed.

## Record your voice
Read NARRATION-RECORDING-GUIDE.txt or the artifact's READ-THIS-TO-RECORD.txt. The script is 312 words with ten timed paragraphs. The artifact also includes narration.txt, timing.json, captions.srt, audio/sound-effects.wav and audio/music-bed.wav.

You can add your take in a video editor. For browser-only rendering, upload public/audio/voiceover.mp3 on GitHub and use Actions → Render The Game Plan → Run workflow → voiceover=yes. Choose captions=false for a clean export.

## Browser download
1. Open https://github.com/BillyHinze/the-game-plan/actions/runs/42974593403.
2. On Summary, scroll to Artifacts.
3. Download THE-GAME-PLAN-v2-1080p.
4. Extract the ZIP and open THE-GAME-PLAN-v2-1080p.mp4.
All builds and rendering run on GitHub-hosted machines. No local terminal or installation is required.

## Implemented systems
The source includes React/TypeScript/Remotion/Three.js rendering, original canvas-drawn articulated puppets, constrained limb solving, expressions, 17 action poses, timed ball paths, set geometry, per-shot cameras, captions, deterministic audio synthesis, narration import and five-part cloud rendering. Reusable original 3D stickman rig modules are also retained.

## Verification and limits
See BUILD_STATUS.md for the successful run and actual checks. All 37 shot samples and eight sequences from the encoded film were reviewed. No user narration was supplied; record your own take and review caption timing against it. No synthetic narrator is included.
