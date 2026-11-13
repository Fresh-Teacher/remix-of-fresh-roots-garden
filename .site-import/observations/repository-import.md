# Website importer: repository app import

Source repository: https://github.com/kyengeraparentschoolmugongo/remix-of-remix-of-remix-of-remix-of-remix-of-new-roots-together

Imported the repository application, not GitHub's interface. Permission confirmed by the user. Preserved TanStack routes, source styling, static catalogs, and catalog maintenance scripts. Transferred all 187 asset pointers into this project; asset-mapping.json records old and new URLs. No source repository metadata, dependencies, generated route tree, or project identity were copied.

## Source comparison
The source project's preview redirects to an authentication bridge. Independent visual and motion comparison is blocked by source access. Source expectations are grounded in repository code and its existing tests; no live-source equivalence is claimed.

## Preview observations
Public preview checked at desktop 1280×1800 and phone 390×844. Screenshots are temporary verification artifacts under /tmp/browser/repository-import/.

| Route | Layout | Trigger and position | Expected and observed result | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| / | Both | Open library, top | Door opens, settles, and exposes shelves | Passed | *-home-settled.png |
| / | Both | Essential only, top | Cookie panel closes | Passed | *-home-settled.png |
| / | Both | Wheel scroll | Lower shelves and footer remain visible; no horizontal overflow | Passed | *-bottom.png |
| / | Desktop | Primary Section then Primary Five | Class list then notes/papers/schemes appear | Passed | desktop-navigation.png |
| / | Phone | Toggle class menu, Primary Section, Primary Five, Escape | Drawer reveals nested resource categories and closes | Passed | phone-navigation.png |
| / | Both | Search the library | Search dialog shows popular searches and full-search action | Passed | *-search-dialog.png |
| /search | Both | Type mathematics, Enter | Shareable search URL and populated results | Passed | *-results.png |
| /doc/b7767ffd92c1eb83-mathemathics | Both | Open search result | Original office document detail and related documents appear | Passed | Browser DOM observation |
| /PrimaryFiveMTCPastPapers.html | Both | Navigate category | Resource gallery populated | Passed | *-category.png |
| /doc/1ba3c100da6b045e-math-p-5 | Both | Flipbook load | Page controls ready | Passed | Browser frame observation |
| /doc/1ba3c100da6b045e-math-p-5 | Both | Vertical scroll mode | PDF canvas renders and loading status disappears | Passed | *-reader-settled.png |
| /doc/1ba3c100da6b045e-math-p-5 | Both | Wheel scroll | Document information and related documents remain reachable | Passed | *-reader-bottom.png |

All 192 existing tests pass. Latest automated build reports build OK. Public information routes expose distinct titles and social descriptions. No page runtime errors observed. Repaired an inherited missing door-settled class using the existing state and tests.

Not verified: independent source motion/visual equivalence, every external document, native installation, legacy APK availability, and all external contact destinations. No new static animation fallbacks or normal-flow substitutions introduced. No backend or authentication was required by this source app.