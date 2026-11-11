# Build and delivery status — 11 November 2026

## Finished film
[Successful full render — run 11](https://github.com/BillyHinze/the-game-plan/actions/runs/42961539216)

- Final animation source: `2adef08a65fd1248725781f88a93ac30ccd7341d`.
- H.264 MP4, **130 seconds**, **720×1280 (9:16)**, **30 FPS**, **3,900 encoded frames**.
- MP4 size: **27,342,030 bytes**.
- All ten scenes are included. Characters, basketball and cameras animate continuously from deterministic frame functions.
- The completed archive was downloaded, its SHA-256 matched GitHub's published digest, and the MP4 was extracted successfully.
- Download artifact: [the-game-plan-final-720p](https://github.com/BillyHinze/the-game-plan/actions/runs/42961539216/artifacts/13829708659).
- Artifact SHA-256: `e0023e0d4b6444096f5a5cb25392bb297b99a5b068a3e16e9cd43c5cede7b6d7`.

## Checks actually executed
- Exact dependency installation from the cloud-generated package-lock.json.
- TypeScript typecheck.
- All ten timeline boundaries at 15, 24 and 30 FPS.
- 15,600 walking/running limb checks: fixed bone lengths, reachable feet and no floor penetration.
- Deterministic ball paths, dribble floor clearance and successful rim-centre crossing.
- Fourteen representative renders including every scene, opening, ending, hoop crossing and a repeated frame.
- Exact pixel equality for the repeated frame.
- Two-second H.264 smoke render.
- Complete 130-second export.
- ffprobe codec, dimensions, duration and exact encoded frame count.
- Full ffmpeg decode and black-frame interval detection: **zero black intervals**.
- Four changing motion sequences extracted from the encoded movie.
- Visual inspection of the representative frames, final contact sheet and encoded motion sheet. This is sampled visual review; the entire film was not watched in a real-time player.

The review corrected black outdoor skies, face/neck overlap, head displacement during turns and a held celebration pose. The workflow now isolates commits and does not cancel running exports, after an older delayed push interrupted an earlier run.

## Higher-resolution and fallback check
[Manual browser-only preview — run 8](https://github.com/BillyHinze/the-game-plan/actions/runs/42959519172) completed at **1080×1920**, 15 FPS, 8 seconds, 120 frames. It passed the encoded-media and motion checks. This backend test preceded the final rig corrections.

Standalone `swiftshader` could not create a WebGL context. Automatic fallback to `swangle` succeeded. Use **swangle** on this runner. A full 1080p film has not been exported.

## Narration
No user MP3 was supplied, so the delivered film is **silent**. Upload public/audio/voiceover.mp3 using GitHub's website to include your recording. Duration fitting and optional exact scene timing are implemented; recording-specific AAC output and speech synchronization remain to be checked with your actual take. Captions use estimated three-word timing, not speech recognition.

## Project files
The project includes the articulated rig, reusable animation math, basketball/environment geometry, original code-drawn face and jersey textures, ten portrait story beats, camera direction, captions, narration/source data, cloud render/QA scripts, workflow, dependency lock and browser-only delivery/recording guides. No local build or installation is needed.
