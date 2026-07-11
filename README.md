# ICACT 2026 — Conference Website

Static website for the **2026 IEEE 3rd International Conference on Advanced Computing Technologies (ICACT 2026)**.

- **Dates:** 1–2 September 2026 · Hilton, Kathmandu, Nepal · Hybrid
- **IEEE Conference Record:** [#70625](https://conferences.ieee.org/conferences_events/conferences/conferencedetails/70625)
- **Sponsor:** Technically sponsored by the IEEE Nepal Section
- **Live URL (target):** https://icact.github.io/

## Structure

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About & important dates |
| `call-for-papers.html` | Call for Papers, tracks, submission |
| `committee.html` | Organising & program committee |
| `registration.html` | Registration & fees |
| `venue.html` | Venue, travel & visa |
| `contact.html` | Contact |
| `styles.css` | Shared design system (IEEE masterbrand blue) |
| `app.js` | Shared header/footer, nav, countdown, animations |
| `assets/` | ICACT & IEEE logos (SVG + PNG) |

No build step — plain HTML/CSS/JS. Just open `index.html`.

## Deployment

The site is **live at https://icact.github.io/**, served by GitHub Pages from the
**`icact/icact.github.io`** repository (the GitHub user account `icact`), branch `main`, root folder.

To publish updates, just commit and push to `main` — Pages redeploys automatically in ~1 minute:

```bash
git add -A
git commit -m "Update ICACT 2026 website"
git push origin main
```

The `.nojekyll` file is included so GitHub Pages serves all files as-is.


