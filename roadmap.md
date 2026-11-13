# Repository import
- [x] Import application source and preserve runtime configuration.
- [x] Transfer source media into this project (187 assets).
- [x] Verify page metadata, tests, and desktop/mobile library browsing.

## Homepage optimization
- [x] Simplify homepage rendering and preserve door timing, audio, and links.
- [x] Stabilize image layout, add accessible book feedback, and prevent session-return flash.
- [x] Verify gestures, session return, and rendering on mobile and desktop (193 tests pass).

## Resource selection — Phase 1
- [x] Keep dropdowns within the page and disable legacy menu transforms.
- [x] Increase triggers to 48px and resource links to at least 44px; make NEW badges static.
- [x] Verify all six P7 menus at 360×575, 360×630 and 1280×900; scheme selection loads 11 documents and 24 navigation tests pass.

## Offline and installable app
- [x] Precache only the app shell (147 files, ~3.2 MB) instead of all 47 MB; library data, artwork and opened documents are cached as a teacher actually opens them.
- [x] Register the worker only in the published app: never in dev, the editor preview, an embedded frame, or with `?sw=off` (8 guard tests pass).
- [x] Write the worker into the served static tree (`dist/client`) and drop the default `index.html` page fallback this SSR build cannot satisfy.
- [x] Re-verified pages opening with the connection cut after the start-URL warm-up: home, a class hub with its menus, an opened document and search all load offline (13 offline tests pass).

## Class hub speed improvements
- [x] Render all 17 class hubs directly from compact per-class menu data, without legacy HTML parsing.
- [x] Replace 484 KB of class-only legacy stylesheets with 16 KB of appearance-matched scoped styles and align loading placeholders.
- [x] Add keyboard menu navigation; verify all 17 hubs at 360×574 and 1280×1800, original destinations, and the 11-document P7 science schemes flow without runtime errors.

## Resource dropdown animations
- [x] Restore the original resource-specific flips, drop-and-bounce, and slides using only five scoped CSS keyframes.
- [x] Verify mobile/desktop entrances, repeat opening, reduced motion, keyboard controls, and document selection (19 existing tests pass; P7 science schemes opens 11 documents).

## Share popup
- [x] Reuse the five entrance animations randomly on opening and enlarge sharing text, icons, and options.
- [x] Verify desktop/mobile opening, repeated random entrances, reduced motion, copy link, and WhatsApp; existing gallery tests pass.

- [x] Replaced offline mode with a basic installable app (manifest + icons); old offline worker retired by a self-unregistering /sw.js.

## Document sharing message
- [x] Include the friendly library introduction and document title in copied messages and supported sharing services.
- [x] Verify shared links open document details, preserve repository context, and never share the original file (17 tests and desktop/phone checks).

## Installation popup library sharing
- [x] Add a share-icon button for the library homepage in the navigation bar’s installation popup, with native sharing and copy fallback.
- [x] Verify native sharing, cancellation, copy fallback, and the popup’s desktop/360×575 phone layout.
- [x] Compact the popup so all information fits at once and match the APK button’s styling in green for Share.
- [x] Verify the complete popup and sharing on 360×575 phone and 1280×1800 desktop; all 9 installation tests pass.
