# The Game Plan — delivery guide

The active video is the 9:16 portrait animation. The source project uses original code-drawn characters and actual frame-based 3D movement.

## Get the finished film
1. Open [the final render run](https://github.com/BillyHinze/the-game-plan/actions/runs/42961539216).
2. The completed run shows **Success**. Scroll to **Artifacts**.
3. Download **the-game-plan-final-720p**.
4. Double-click the ZIP in Finder, then play **the-game-plan-final-720p.mp4**.

The main film is 130 seconds, 30 FPS and 720×1280. The small smoke-test file is a two-second diagnostic.

## Add your recording
Open **public/audio/** in the repository → **Add file** → **Upload files**. Upload your recording as **voiceover.mp3**, then commit it. A new export starts automatically. Use [VOICEOVER.md](VOICEOVER.md) for the script and scene timing. No synthetic narration is included.

For a manual export: **Actions → Render The Game Plan → Run workflow → main → final → 720p → voiceover auto → swangle → Run workflow**.

**1080p** produces 1080×1920 portrait output. An eight-second 1080p preview was tested successfully. The full delivery uses 720p.

## What is included
- Reusable articulated stickman rig with two-bone limb constraints.
- Walking, running, jumps, dribbling, passing, shots, celebration, study and team interaction.
- Ten story beats, deterministic camera direction and short outlined captions.
- Basketball court, school room, transport setting and original character textures.
- Locked dependencies and a complete browser-operated GitHub Actions workflow.
- Source credits, recording guide and verification results.

See [BUILD_STATUS.md](BUILD_STATUS.md) for the specific runs, checks and remaining narration limitations. Artifacts expire after 30 days; keep a downloaded copy.
