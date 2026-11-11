# THE GAME PLAN
## Staying Active Through Years 11 and 12
An original procedural 3D basketball infomercial for Year 10 HPE. **130 seconds • 16:9 • 30 FPS final • H.264 MP4 • 720p or 1080p.**

[Open the render workflow](https://github.com/BillyHinze/the-game-plan/actions/workflows/render.yml)

Everything installs, validates and renders on GitHub-hosted runners. You only use the GitHub website. No Terminal, local Node, npm, Python, Codespaces terminal or paid rendering service is required.

### Render and download using buttons
1. Sign in and open this repository in your browser.
2. Click **Actions**.
3. Select **Render The Game Plan** on the left.
4. Click **Run workflow** on the right. Use the **main** branch.
5. Choose **preview** for an eight-second match excerpt, or **final** for the complete film. Choose **720p** first; **1080p** uses more memory. Final exports always use 30 FPS. Preview can use 15 or 30 FPS.
6. Leave **voiceover = auto** for silent output when no recording is present. Choose **no** to ignore an uploaded recording, or **yes** to require it.
7. Leave the graphics backend on **swangle**, then click the green **Run workflow** button.
8. Open the new run. Wait until the render and verification steps are green. Rendering a full 3D film on a CPU runner can take tens of minutes.
9. Open the run's **Summary**, scroll to **Artifacts**, and click **the-game-plan-final-720p** (or your selected mode/size). GitHub requires you to be signed in to download.
10. Open the downloaded ZIP in Finder. Play **the-game-plan-final-720p.mp4** in QuickTime or upload that MP4 for your assessment. **smoke-test.mp4** is a separate two-second diagnostic.
11. Open **qa/contact-sheet.png**, the individual PNGs and **qa/verification.json** to review the scene frames and export checks. Artifacts are retained for 30 days; download a copy.

A source-code push automatically starts a complete silent/auto-audio 720p render. Manual runs let you select settings. New runs on the same branch cancel older runs to conserve runner time. Public repositories normally use standard hosted runners without consuming private-repository included minutes; GitHub account limits still apply.

### Your narration
No synthetic narration, third-party soundtrack, external images or remote runtime assets are used. All geometry is generated in code.

Open **public/audio/** → **Add file → Upload files**, upload your recording named **voiceover.mp3**, and commit. Then run the workflow with voiceover **auto** or **yes**. The file must really contain MP3 audio. Recording and upload are your only audio steps; AAC encoding happens in the cloud.

Use [VOICEOVER.md](VOICEOVER.md). Aim for 130 seconds; the allowed range is 120–180 seconds. The renderer measures your recording with ffprobe, starts it at frame zero, and adjusts the scene schedule in proportion to its length, with up to one second of ending space. It never trims or speeds up the voice.

**This is duration fitting, not speech recognition.** For exact scene changes, use GitHub's **Create new file** in public/audio and name it **timing.json**. Paste 11 increasing second values, for example:
```json
[0, 9, 13, 35, 49, 57, 68, 82, 90, 106, 130]
```
These are the start of scenes 1–10, followed by the film end. Start at zero; finish at 120–180 and at or after the recording's end. Read the timing sheet while recording or adjust these values after listening. Script captions divide each scene's words into estimated chunks; review them with your take. You can turn captions off in Run workflow and add final subtitles later.

### What the film proposes
During Years 11–12: enquire with **Suncoast Clippers** about an age-appropriate junior team and availability, play one organised weekly game in season, and practise for around **30–45 minutes once a week** independently or with friends. Example calendar days are illustrative, not confirmed fixtures. Budget approximately **60–90 minutes plus travel** around a game, depending on the fixture.

Shoes, suitable clothing, a ball for practice and water are needed. A parent/carer helps confirm registration, costs, age group and transport. Plan parent transport or an agreed carpool and a backup option. Check availability before paying. Adjust extra practice during exams while retaining achievable daily movement.

At **18 or older**, consider **SportUP Sunshine Coast adult social basketball**. This is a separate organisation and a later transition, not a junior SportUP registration.

A single weekly game is only part of daily activity. Australian guidance for ages 5–17 is **at least 60 minutes of moderate-to-vigorous activity daily**. General light movement can complement this, but does not all count toward the 60-minute target. Include activities that make the heart beat faster; the full guidance also includes vigorous and muscle/bone-strengthening activity at least three days per week.

### Research and registration costs
Facts checked **11 November 2026**:
- [SportUP FAQ](https://sportupsunshine.com.au/faq): all players must be at least 18.
- [SportUP social basketball](https://sportupsunshine.com.au/sports/social-basketball-sunshine-coast): the adult social competition option.
- [Suncoast Clippers juniors](https://clippersbasketball.com.au/junior-basketball/): weekly junior competition, new-player availability checks and age-group allocation. Listed Summer 2026 season registration: **$255 early bird / $290 after registrations close**. **BQ $91.47** for ages 10+ and **BA $5.50** may be added when due. Processing/platform fees are extra; instalments are listed. These are current examples, not a quote for your future season. Confirm the current fee and uniform/equipment requirements with the club.
- [Australian Government activity guidance, ages 5–17](https://www.health.gov.au/topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians/recommendations-for-children-and-young-people-5-to-17-years): daily activity recommendation and potential physical, emotional, social and concentration benefits.

Benefits are opportunities, not guaranteed outcomes. Physical: fitness, coordination, stamina. Mental: stress management and concentration. Emotional: mood and confidence. Social: teamwork, communication and friendship. Spiritual wellbeing is framed as purpose, connection and belonging without a religious assumption.

Evaluate participation, a simple repeated fitness measure and a weekly wellbeing reflection. If attendance or wellbeing declines, discuss the routine with a parent/carer and reduce extra practice or change timing. With cost, transport and workload support, this is an achievable contribution to a balanced senior-school routine.

### Animation architecture
- **src/components/Stickman.tsx**: hierarchical articulated character; torso, neck/head, shoulders, hips, fixed-length upper/lower limbs, hands and feet. Analytic two-bone IK constrains elbows and knees.
- **src/animations/**: walking, running, easing, idle breathing, jumps, gestures, celebrations and basketball paths. Sitting, tired and deadline poses share the rig.
- **src/components/BasketballCourt.tsx**: 3D floor, markings, backboard, rim, net, scoreboard, bleachers and minimal coastal scenery.
- **src/scenes/**: ten complete animated story beats. Passing, dribbling, running, shooting, planning and team interaction.
- **CameraController.tsx**: deterministic scene-specific pans, dollies, tracking, elevated framing and shot close-up.
- **Overlay.tsx**: SVG/CSS labels, calendar, wellbeing indicators, captions, age pathway and source credits.
- **timeline.ts / narration.ts**: one frame-boundary map and the supplied script. Timeline was adapted for narration; it is not the original storyboard's exact timestamp list.
- **scripts/render.ts**: bundle, browser install, backend probe/fallback, all scene stills, smoke test, MP4 export.
- **scripts/validate.ts / qa.ts**: temporal, kinematic and encoded-media checks.

No random numbers, delta-time integration, live physics, timers, useFrame motion or external media are used. ThreeCanvas synchronizes declarative props to Remotion's current frame. Character assets and the palette remain consistent across all scenes. Cuts connect story beats; text uses short eased entrances, and cameras use smooth bounded paths.

### Cloud reliability and failures
Remotion packages use the same exact version. A first cloud run resolves **package-lock.json** and commits it after typecheck and tests pass; later runs use **npm ci** against that lock. No lockfile is fabricated by hand.

The default backend is **swangle** (SwiftShader through ANGLE), appropriate for CPU-only hosted runners. The first rendered frame probes it; if it fails, the script tries **swiftshader**. You may explicitly try **angle** in the form; it also falls back. Backend success is written to **out/render-report.json**. These alternatives must pass an actual render before being treated as working on your runner.

Rendering uses **one browser page at a time**, device pixel ratio 1, moderate geometry, fake contact shadows and a 4 GB Node heap. If a 1080p job exhausts memory, select **720p** in Run workflow and retry; no source rewrite is needed. A failed render does not pretend to create a video. Diagnostic artifacts are uploaded even on failure; the full MP4 exists only when the rendering step completes.

If installation fails, inspect the dependency step. If narration is missing or outside the allowed duration, fix the file or choose **no**. If GitHub disables Actions, enable Actions in the repository and retry. The first lockfile commit requires the workflow's contents-write permission; if the repository policy blocks it, an owner must allow that repository workflow permission.

### Validation scope
The pipeline typechecks all source, checks every scene boundary at 15/24/30 FPS, exercises limb reach across the full default timeline, verifies ball/floor and hoop crossing, renders frames from all ten scenes plus beginning/end and the shot, and checks repeated-frame pixel equality. It then renders a two-second smoke test and the selected export. ffprobe/ffmpeg verify codec, dimensions, duration, AAC when narration is used, decodability and no near-total black intervals.

These automated checks cannot certify aesthetic quality or exact caption alignment with a new voice take. Inspect the contact sheet and watch the MP4 before submission. See **BUILD_STATUS.md** for the checks actually observed during delivery.

The linked YouTube tutorial could not be inspected during implementation. The design follows the written visual brief and uses original characters, scenes and procedural geometry rather than copying another animation.

### Dependencies and rights
This project is for a school assessment. It uses React, Three.js, React Three Fiber and Remotion. Follow their licences, including Remotion's licence terms for your use. No official organisation logos are reproduced, and no endorsement is implied.
