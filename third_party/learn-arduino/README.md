# Learn Arduino — published snapshot and Russian adaptation

Source: https://learn-arduino-red.vercel.app/  
Author linked by the application: https://x.com/DilumSanjaya  
Retrieved: 2026-10-22

`upstream/` preserves the published HTML, JavaScript modules, CSS and fonts. `snapshot.json` records their SHA-256 hashes. This is a snapshot of the published application, not an identified source repository. No open-source license for the author's application was located; the user's request to adapt the site does not establish an upstream license. The snapshot must not be represented as MIT-licensed or as our own original application. Author/source attribution remains in this document and the unchanged upstream snapshot. The student interface omits external links and the social watermark at the user’s request.

Bundled library/font license notices are kept in `notices/` and copied with the laboratory. They apply to those dependencies, not to the author's custom application.

`locales/ru-pairs.txt` contains Russian educational/UI translations. `scripts/prepareArduino.mjs` creates `public/courses/arduino/` without any network requests. It translates literal UI strings and recognized HTML fragments, preserving GLSL and Arduino program syntax. The original 11 models/simulation modes and controls remain intact.

`bridge.js` connects lesson selection and successful simulation starts with CyberLearn, checks the parent window/origin, scopes device settings by student ID, and synchronizes completion markers from the account. A simulation start completes the corresponding platform exercise, matching the original application's completion rule. It is not a hardware test or arbitrary C++ compiler. Repeat runs do not award new XP/coins. The original device-only progress reset is hidden because school-account completion is authoritative.

The adaptation runs in a separate local iframe document, so its layout/styles and WebGL lifecycle do not affect the surrounding platform. A failed progress save can be retried. All original model and font resources are local. External source links are kept in project documentation only.

Checks: `node scripts/arduinoSnapshot.check.mjs`, `node scripts/arduino.browser.check.mjs`.

The CyberLearn redesign uses an unscaled CSS grid, an independent 3D region and study column, opt-in component labels, a run button beside the camera tools, and a non-overlapping inspector in the study column. Mobile uses one document scroll root. Shader/Arduino code remains unchanged; the camera pointer UI guard recognizes the new controls. `arduinoLayout.browser.check.mjs` audits six viewport sizes and real controls.
